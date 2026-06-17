import clsx from 'clsx';
import { Card } from './Card';
import { Badge } from './Badge';

interface FoodCardProps {
  name: string;
  stateName: string;
  category: string;
  isVegetarian: boolean;
  spiceLevel: 'mild' | 'medium' | 'hot' | 'very-hot';
  imageUrl: string;
  slug: string;
  className?: string;
}

export function FoodCard({ name, stateName, category, isVegetarian, spiceLevel, imageUrl, slug, className }: FoodCardProps) {
  const spiceColors: Record<string, string> = {
    mild: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    hot: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'very-hot': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <a href={`/food/${slug}`} className={clsx('block', className)}>
      <Card hoverable className="overflow-hidden">
        <div className="relative h-48 bg-slate-200 dark:bg-slate-700">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" onError={(e) => { const t = e.target as HTMLImageElement; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/images/placeholders/food.svg'; } }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-200">{stateName}</p>
          </div>
        </div>
        <div className="p-4 flex flex-wrap gap-2">
          <Badge variant="default" size="sm">{category}</Badge>
          {isVegetarian && <Badge variant="success" size="sm">Vegetarian</Badge>}
          <span className={clsx('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', spiceColors[spiceLevel])}>
            {spiceLevel}
          </span>
        </div>
      </Card>
    </a>
  );
}
