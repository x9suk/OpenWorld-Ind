import { getImageSrc, getCategoryFallback } from '@/lib/images';
import {
  foodImages,
  stateImages,
  cityImages,
  monumentImages,
  festivalImages,
  historyImages,
} from '@/data/imageRegistry';
import type { Food, State, City, Monument, Festival, HistoricalEvent } from '@openworld/types';

type Category = 'food' | 'state' | 'city' | 'monument' | 'festival' | 'history';

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

const REGISTRIES: Record<Category, Record<string, string>> = {
  food: foodImages,
  state: stateImages,
  city: cityImages,
  monument: monumentImages,
  festival: festivalImages,
  history: historyImages,
};

const FALLBACKS: Record<Category, string> = {
  food: '/images/placeholders/food.svg',
  state: '/images/placeholders/state.svg',
  city: '/images/placeholders/city.svg',
  monument: '/images/placeholders/monument.svg',
  festival: '/images/placeholders/festival.svg',
  history: '/images/placeholders/history.svg',
};

export function resolveEntityImage(
  type: Category,
  slugOrName: string,
  originalImage: string | undefined | null,
): string {
  const slug = toSlug(slugOrName);

  const registry = REGISTRIES[type];
  if (registry && registry[slug]) {
    return registry[slug];
  }

  if (originalImage && originalImage.trim() !== '') {
    return originalImage;
  }

  return FALLBACKS[type];
}

export function resolveFoodImage(food: Food | { name: string; imageUrl?: string | null }): string {
  return resolveEntityImage('food', food.name, food.imageUrl);
}

export function resolveStateImage(state: State | { name: string; imageUrl?: string | null }): string {
  return resolveEntityImage('state', state.name, state.imageUrl);
}

export function resolveCityImage(city: City | { name: string; imageUrl?: string | null }): string {
  return resolveEntityImage('city', city.name, city.imageUrl);
}

export function resolveMonumentImage(monument: Monument | { name: string; imageUrl?: string | null }): string {
  return resolveEntityImage('monument', monument.name, monument.imageUrl);
}

export function resolveFestivalImage(festival: Festival | { name: string; imageUrl?: string | null }): string {
  return resolveEntityImage('festival', festival.name, festival.imageUrl);
}

export function resolveHistoryImage(event: HistoricalEvent | { title: string; imageUrl?: string | null }): string {
  return resolveEntityImage('history', 'title' in event ? event.title : '', event.imageUrl);
}
