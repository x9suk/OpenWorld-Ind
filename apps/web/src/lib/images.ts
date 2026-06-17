type Category = 'state' | 'city' | 'monument' | 'food' | 'festival' | 'history';

const PLACEHOLDERS: Record<Category, string> = {
  state: '/images/placeholders/state.svg',
  city: '/images/placeholders/city.svg',
  monument: '/images/placeholders/monument.svg',
  food: '/images/placeholders/food.svg',
  festival: '/images/placeholders/festival.svg',
  history: '/images/placeholders/history.svg',
};

const DEFAULT_FALLBACK = '/images/placeholders/state.svg';

export function getImageSrc(src: string | undefined | null, fallback: string): string {
  if (!src || src.trim() === '') {
    return fallback;
  }
  return src;
}

export function getCategoryFallback(category: Category): string {
  return PLACEHOLDERS[category] || DEFAULT_FALLBACK;
}

export function getStateImage(src: string | undefined | null): string {
  return getImageSrc(src, PLACEHOLDERS.state);
}

export function getCityImage(src: string | undefined | null): string {
  return getImageSrc(src, PLACEHOLDERS.city);
}

export function getMonumentImage(src: string | undefined | null): string {
  return getImageSrc(src, PLACEHOLDERS.monument);
}

export function getFoodImage(src: string | undefined | null): string {
  return getImageSrc(src, PLACEHOLDERS.food);
}

export function getFestivalImage(src: string | undefined | null): string {
  return getImageSrc(src, PLACEHOLDERS.festival);
}

export function getHistoryImage(src: string | undefined | null): string {
  return getImageSrc(src, PLACEHOLDERS.history);
}

export function getGalleryImages(
  primaryImage: string | undefined | null,
  galleryImages: (string | { url: string })[] | undefined | null,
  category: Category,
): string[] {
  const fallback = getCategoryFallback(category);
  const images: string[] = [];
  if (primaryImage) {
    images.push(primaryImage);
  }
  if (galleryImages) {
    for (const img of galleryImages) {
      const url = typeof img === 'string' ? img : img.url;
      if (url && !images.includes(url)) {
        images.push(url);
      }
    }
  }
  return images.length > 0 ? images : [fallback];
}
