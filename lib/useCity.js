'use client';

import useStoredState from './useStoredState';
import { CITIES } from './panchang';

/** The visitor's chosen panchang city, shared by Panchang, Aaj ka Upay and the home page. */
export default function useCity() {
  const [cityId, setCityId] = useStoredState('vedicdhaam-city', 'delhi');
  const city = CITIES.find((c) => c.id === cityId) || CITIES[0];
  return { cityId: city.id, city, setCityId };
}
