import clsx from 'clsx';
import { Card } from './Card';
import { Badge } from './Badge';

interface FestivalCardProps {
  name: string;
  stateName: string;
  month: string;
  type: string;
  imageUrl: string;
  slug: string;
  className?: string;
}

export function FestivalCard({ name, stateName, month, type, imageUrl, slug, className }: FestivalCardProps) {
  return (
    <a href={`/festivals/${slug}`} className={clsx('block', className)}>
      <Card hoverable className="overflow-hidden">
        <div className="relative h-48 bg-slate-200 dark:bg-slate-700">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" onError={(e) => { const t = e.target as HTMLImageElement; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/images/placeholders/festival.svg'; } }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-200">{stateName}</p>
          </div>
        </div>
        <div className="p-4 flex flex-wrap gap-2">
          <Badge variant="info" size="sm">{type}</Badge>
          <Badge variant="default" size="sm">{month}</Badge>
        </div>
      </Card>
    </a>
  );
}
