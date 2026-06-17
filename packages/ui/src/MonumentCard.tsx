import clsx from 'clsx';
import { Card } from './Card';
import { Badge } from './Badge';

interface MonumentCardProps {
  name: string;
  stateName: string;
  builtBy: string;
  builtIn: string;
  style: string;
  imageUrl: string;
  slug: string;
  className?: string;
}

export function MonumentCard({ name, stateName, builtBy, builtIn, style, imageUrl, slug, className }: MonumentCardProps) {
  return (
    <a href={`/monuments/${slug}`} className={clsx('block', className)}>
      <Card hoverable className="overflow-hidden">
        <div className="relative h-48 bg-slate-200 dark:bg-slate-700">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" onError={(e) => { const t = e.target as HTMLImageElement; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/images/placeholders/monument.svg'; } }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-200">{stateName}</p>
          </div>
        </div>
        <div className="p-4 space-y-1">
          <div className="flex flex-wrap gap-2">
            <Badge variant="info" size="sm">{style}</Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Built by {builtBy} in {builtIn}</p>
        </div>
      </Card>
    </a>
  );
}
