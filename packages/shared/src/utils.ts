import { PERIODS } from './constants';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function formatPopulation(n: number): string {
  if (n >= 10_000_000) {
    const cr = n / 10_000_000;
    return `${cr.toFixed(cr % 1 === 0 ? 0 : 1)} Cr`;
  }
  if (n >= 100_000) {
    const lakh = n / 100_000;
    return `${lakh.toFixed(lakh % 1 === 0 ? 0 : 1)} Lakhs`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1)}K`;
  }
  return n.toString();
}

export function formatArea(sqKm: number): string {
  return sqKm.toLocaleString('en-IN');
}

export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + '...';
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getTimePeriod(year: number): string {
  for (const p of PERIODS) {
    if (p.id === 'ancient' && year <= 750) return p.id;
    if (p.id === 'medieval' && year > 750 && year <= 1526) return p.id;
    if (p.id === 'colonial' && year > 1526 && year <= 1947) return p.id;
    if (p.id === 'independence' && year >= 1857 && year <= 1947) return p.id;
    if (p.id === 'modern' && year >= 1947) return p.id;
  }
  return 'ancient';
}

export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
