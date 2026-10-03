"""Build the Janam Sthan (birth place) dataset: State -> District -> Village/Town.

Sources (downloaded into scripts/.cache on first run):
  - GeoNames IN.zip (CC BY 4.0): ~5.5 lakh populated places in India with coordinates.
  - udit-001/india-maps-data district boundaries (one GeoJSON per state).

Every populated place is assigned to the district polygon that contains it, then written
to public/places/<state>/<district>.json as [name, lat, lon] rows, so the
birth-chart page only downloads the district the visitor picks. lib/placesIndex.js holds
the small State/District index (names + district centre) that ships with the page.

Run:  pip install shapely   then   python scripts/build-places.py
"""
import collections, io, json, pathlib, re, urllib.request, zipfile

from shapely.geometry import Point, shape
from shapely.ops import unary_union
from shapely.strtree import STRtree

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = ROOT / 'scripts' / '.cache'
OUT = ROOT / 'public' / 'places'
INDEX = ROOT / 'lib' / 'placesIndex.js'

MAPS = 'https://raw.githubusercontent.com/udit-001/india-maps-data/main/geojson/states/'
STATES = {
    'andaman-and-nicobar-islands': 'अंडमान और निकोबार द्वीप समूह', 'andhra-pradesh': 'आंध्र प्रदेश',
    'arunachal-pradesh': 'अरुणाचल प्रदेश', 'assam': 'असम', 'bihar': 'बिहार', 'chandigarh': 'चंडीगढ़',
    'chhattisgarh': 'छत्तीसगढ़', 'delhi': 'दिल्ली', 'dnh-and-dd': 'दादरा और नगर हवेली और दमन और दीव',
    'goa': 'गोवा', 'gujarat': 'गुजरात', 'haryana': 'हरियाणा', 'himachal-pradesh': 'हिमाचल प्रदेश',
    'jammu-and-kashmir': 'जम्मू और कश्मीर', 'jharkhand': 'झारखंड', 'karnataka': 'कर्नाटक', 'kerala': 'केरल',
    'ladakh': 'लद्दाख', 'lakshadweep': 'लक्षद्वीप', 'madhya-pradesh': 'मध्य प्रदेश', 'maharashtra': 'महाराष्ट्र',
    'manipur': 'मणिपुर', 'meghalaya': 'मेघालय', 'mizoram': 'मिज़ोरम', 'nagaland': 'नागालैंड', 'odisha': 'ओडिशा',
    'puducherry': 'पुडुचेरी', 'punjab': 'पंजाब', 'rajasthan': 'राजस्थान', 'sikkim': 'सिक्किम',
    'tamil-nadu': 'तमिलनाडु', 'telangana': 'तेलंगाना', 'tripura': 'त्रिपुरा', 'uttar-pradesh': 'उत्तर प्रदेश',
    'uttarakhand': 'उत्तराखंड', 'west-bengal': 'पश्चिम बंगाल',
}
# GeoNames feature codes for places that no longer exist or are historical.
SKIP_CODES = {'PPLH', 'PPLQ', 'PPLW', 'PPLCH'}
DEVANAGARI = re.compile(r'^[ऀ-ॿ\s.\-()]+$')


def fetch(url, name):
    CACHE.mkdir(parents=True, exist_ok=True)
    path = CACHE / name
    if not path.exists():
        print('downloading', url)
        urllib.request.urlretrieve(url, path)
    return path


def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


def norm(s):
    return re.sub(r'[^a-z]', '', s.lower())


def hindi_alt(altnames):
    for a in altnames.split(','):
        a = a.strip()
        if a and DEVANAGARI.match(a):
            return a
    return ''


# 1. District polygons -------------------------------------------------------
districts = []  # dicts: state, name, slug, geom
for st in STATES:
    gj = json.loads(fetch(MAPS + st + '.geojson', st + '.geojson').read_text(encoding='utf-8'))
    parts = collections.defaultdict(list)
    st_name = None
    for f in gj['features']:
        p = f['properties']
        st_name = st_name or p.get('st_nm')
        if p.get('district'):
            parts[p['district'].strip()].append(shape(f['geometry']).buffer(0))
    for name, geoms in parts.items():
        districts.append({'state': st, 'stateName': st_name, 'name': name, 'slug': slugify(name), 'geom': unary_union(geoms)})
print(len(districts), 'districts')

tree = STRtree([d['geom'] for d in districts])

# 2. GeoNames populated places -------------------------------------------------
zpath = fetch('https://download.geonames.org/export/dump/IN.zip', 'IN.zip')
rows = collections.defaultdict(dict)  # district index -> {dedupe key: row}
adm2_hi = {}  # normalized district name -> Hindi
unassigned = 0
with zipfile.ZipFile(zpath) as z, z.open('IN.txt') as fh:
    for line in io.TextIOWrapper(fh, encoding='utf-8'):
        c = line.rstrip('\n').split('\t')
        fclass, fcode = c[6], c[7]
        if fcode == 'ADM2':
            hi = hindi_alt(c[3])
            if hi:
                adm2_hi.setdefault(norm(c[2].replace(' District', '')), hi)
            continue
        if fclass != 'P' or fcode in SKIP_CODES:
            continue
        lat, lon = float(c[4]), float(c[5])
        pt = Point(lon, lat)
        hits = [i for i in tree.query(pt) if districts[i]['geom'].covers(pt)]
        if not hits:
            near = tree.query_nearest(pt, max_distance=0.05)  # ~5 km: coastal / border points
            hits = list(near[:1])
        if not hits:
            unassigned += 1
            continue
        name = (c[2] or c[1]).strip()
        key = (name.lower(), round(lat, 2), round(lon, 2))
        if key not in rows[hits[0]]:
            rows[hits[0]][key] = [name, round(lat, 4), round(lon, 4)]

# 3. Write per-district files + index ----------------------------------------
if OUT.exists():
    for f in OUT.rglob('*.json'):
        f.unlink()
index = collections.OrderedDict()
total = 0
for i, d in enumerate(districts):
    places = sorted(rows[i].values(), key=lambda r: r[0].lower())
    total += len(places)
    (OUT / d['state']).mkdir(parents=True, exist_ok=True)
    (OUT / d['state'] / f"{d['slug']}.json").write_text(json.dumps(places, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    c = d['geom'].representative_point()
    st = index.setdefault(d['state'], {'id': d['state'], 'en': d['stateName'], 'hi': STATES[d['state']], 'districts': []})
    st['districts'].append({'id': d['slug'], 'en': d['name'], 'hi': adm2_hi.get(norm(d['name']), ''), 'lat': round(c.y, 4), 'lon': round(c.x, 4), 'n': len(places)})

states = sorted(index.values(), key=lambda s: s['en'])
for s in states:
    s['districts'].sort(key=lambda x: x['en'])
INDEX.write_text(
    '// Generated by scripts/build-places.py — do not edit by hand.\n'
    '// State -> District index for the Janam Sthan picker. Villages/towns of each district\n'
    '// live in public/places/<state>/<district>.json as [name, lat, lon].\n'
    '// Place data: GeoNames (CC BY 4.0). District boundaries: india-maps-data.\n'
    f'export const PLACE_STATES = {json.dumps(states, ensure_ascii=False, separators=(",", ":"))};\n',
    encoding='utf-8')
print(f'{total} places written, {unassigned} outside every district')
