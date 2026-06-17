export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function getImageUrl(path: string | null | undefined, fallback = '/placeholder.svg'): string {
  return path || fallback;
}
