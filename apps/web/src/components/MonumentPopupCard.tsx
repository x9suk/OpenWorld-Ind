'use client';

import { SafeImage } from '@/components/SafeImage';
import type { Monument } from '@openworld/types';

interface MonumentPopupCardProps {
  monument: Monument;
}

export function MonumentPopupCard({ monument }: MonumentPopupCardProps) {
  return (
    <div className="min-w-[240px] max-w-[300px]">
      <div className="relative h-32 -mx-3 -mt-3 mb-3 rounded-t-lg overflow-hidden bg-slate-200 dark:bg-slate-700">
        <SafeImage
          src={monument.imageUrl || '/images/placeholders/monument.svg'}
          alt={monument.name}
          fill
          fallbackSrc="/images/placeholders/monument.svg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <p className="text-white text-xs font-medium">{monument.style}</p>
        </div>
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 leading-tight">
        {monument.name}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 line-clamp-2">
        {monument.description}
      </p>
      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="inline-flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {monument.builtIn}
        </span>
        <span className="inline-flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {monument.builtBy}
        </span>
      </div>
      <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
        {monument.entryFee}
      </div>
    </div>
  );
}
