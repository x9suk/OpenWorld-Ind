import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  color?: string;
  className?: string;
}

export function StatCard({ label, value, icon, className }: StatCardProps) {
  return (
    <Card className={clsx('p-5 flex items-center gap-4', className)}>
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
          {icon}
        </div>
      )}
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </Card>
  );
}
