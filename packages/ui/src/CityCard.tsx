import clsx from 'clsx';
import { Card } from './Card';
import { Badge } from './Badge';

interface CityCardProps {
  name: string;
  stateName: string;
  population: string;
  famousPlaces: string[];
  imageUrl: string;
  slug: string;
  className?: string;
}

export function CityCard({ name, stateName, population, famousPlaces, imageUrl, slug, className }: CityCardProps) {
  return (
    <a href={`/cities/${slug}`} className={clsx('block', className)}>
      <Card hoverable className="overflow-hidden">
        <div className="relative h-48 bg-slate-200 dark:bg-slate-700">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" onError={(e) => { const t = e.target as HTMLImageElement; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/images/placeholders/city.svg'; } }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-200">{stateName}</p>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <Badge variant="info" size="sm">Pop: {population}</Badge>
          {famousPlaces.length > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Famous: </span>
              {famousPlaces.slice(0, 3).join(', ')}
            </p>
          )}
        </div>
      </Card>
    </a>
  );
}
