import type { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  children: ReactNode;
}

export function Card({ hoverable, children, className, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl shadow bg-white dark:bg-gray-800 transition-shadow',
        hoverable && 'hover:shadow-lg cursor-pointer',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
