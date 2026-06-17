import clsx from 'clsx';
import { Card } from './Card';
import { Badge } from './Badge';

interface ItineraryCardProps {
  title: string;
  description: string;
  duration: string;
  type: string;
  dayCount: number;
  imageUrl: string;
  slug: string;
  className?: string;
}

export function ItineraryCard({ title, description, duration, type, dayCount, imageUrl, slug, className }: ItineraryCardProps) {
  return (
    <a href={`/itineraries/${slug}`} className={clsx('block', className)}>
      <Card hoverable className="overflow-hidden">
        <div className="relative h-40 bg-slate-200 dark:bg-slate-700">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" onError={(e) => { const t = e.target as HTMLImageElement; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/images/placeholders/state.svg'; } }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="info" size="sm">{type}</Badge>
            <Badge variant="default" size="sm">{dayCount} days</Badge>
            <Badge variant="default" size="sm">{duration}</Badge>
          </div>
        </div>
      </Card>
    </a>
  );
}
