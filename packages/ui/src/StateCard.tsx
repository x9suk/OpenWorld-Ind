import clsx from 'clsx';
import { Card } from './Card';
import { Badge } from './Badge';

interface StateCardProps {
  name: string;
  capital: string;
  population: string;
  area: string;
  languageCount: number;
  imageUrl: string;
  slug: string;
  color?: string;
  className?: string;
}

export function StateCard({ name, capital, population, area, languageCount, imageUrl, slug, color, className }: StateCardProps) {
  return (
    <a href={`/states/${slug}`} className={clsx('block', className)}>
      <Card hoverable className="overflow-hidden">
        <div className="relative h-48 bg-slate-200 dark:bg-slate-700">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" onError={(e) => { const t = e.target as HTMLImageElement; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/images/placeholders/state.svg'; } }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-200">{capital}</p>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="info" size="sm">Pop: {population}</Badge>
            <Badge variant="info" size="sm">Area: {area}</Badge>
            <Badge variant="info" size="sm">{languageCount} languages</Badge>
          </div>
        </div>
      </Card>
    </a>
  );
}
