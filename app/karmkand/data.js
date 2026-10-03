// Server-side data access for the Karmkand section (pooja paddhati + samagri kosh).
import { apiGet, apiGetAll } from '@/lib/server-api';

const opts = { revalidate: 600, tags: ['karmkand'] };

/** Pooja cards (no ritual text): slug, name, deity, icon, tone, category, level, duration, short, stepCount, samagriItems. */
export const getPoojas = () => apiGetAll('/poojas', opts);

export const getPoojaCategories = async () => (await apiGet('/poojas/categories', opts))?.data ?? [];

/** Full pooja with samagri resolved to { item, qty, name, icon }, plus prev / next / categoryName. Null if missing. */
export const getPooja = async (slug) => (await apiGet(`/poojas/${encodeURIComponent(slug)}`, opts))?.data ?? null;

export const getSamagriList = () => apiGetAll('/samagri', opts);

export const getSamagriCategories = async () => (await apiGet('/samagri/categories', opts))?.data ?? [];
