import clsx from 'clsx';

interface InfoItem {
  label: string;
  value: string;
}

interface InfoGridProps {
  items: InfoItem[];
  className?: string;
}

export function InfoGrid({ items, className }: InfoGridProps) {
  return (
    <div className={clsx('grid grid-cols-2 gap-4', className)}>
      {items.map((item, index) => (
        <div key={index}>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
          <p className="text-base font-medium text-gray-900 dark:text-gray-100">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
