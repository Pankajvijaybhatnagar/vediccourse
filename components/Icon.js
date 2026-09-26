import {
  Award, Briefcase, BrainCircuit, CalendarDays, Eye, Flame, Flower2, Gem, Globe, Grid3x3, Hand, Hash, Heart,
  House, IndianRupee, Layers, Orbit, PhoneCall, Sparkles, Star, Sun, Users, Venus,
} from 'lucide-react';

const ICONS = { Award, Briefcase, BrainCircuit, CalendarDays, Eye, Flame, Flower2, Gem, Globe, Grid3x3, Hand, Hash, Heart, House, IndianRupee, Layers, Orbit, PhoneCall, Sparkles, Star, Sun, Users, Venus };

/** Renders a lucide icon by name; "om" renders the ॐ glyph. */
export default function Icon({ name, size = 24, strokeWidth = 1.6, className }) {
  if (name === 'om') {
    return (
      <span className={className} style={{ fontSize: size * 1.1, lineHeight: 1, fontWeight: 600 }} aria-hidden="true">
        ॐ
      </span>
    );
  }
  const Cmp = ICONS[name];
  return Cmp ? <Cmp size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" /> : null;
}
