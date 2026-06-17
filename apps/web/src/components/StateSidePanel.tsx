'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Badge } from '@openworld/ui';
import { stateSlugs } from '@openworld/shared';
import type { State } from '@openworld/types';

interface StateSidePanelProps {
  state: State | null;
  onClose: () => void;
}

function StateImageCarousel({ state }: { state: State }) {
  const images = [state.imageUrl, ...state.touristAttractions.slice(0, 3).map(
    (_, i) => state.imageUrl,
  )];
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimerRef = useRef<() => void>();
  const startTimerRef = useRef<() => void>();

  stopTimerRef.current = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  startTimerRef.current = () => {
    stopTimerRef.current?.();
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  useEffect(() => {
    startTimerRef.current?.();
    return () => stopTimerRef.current?.();
  }, [images.length]);

  return (
    <div
      className="aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative group"
      onMouseEnter={() => stopTimerRef.current?.()}
      onMouseLeave={() => startTimerRef.current?.()}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={state.name}
          className="w-full h-full object-cover"
          loading="lazy"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
        <div className="flex items-center justify-between">
          <p className="text-white text-xs font-medium drop-shadow-sm">
            {current === 0 ? 'Overview' : state.touristAttractions[current - 1]}
          </p>
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === current
                    ? 'bg-white w-4'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {images.length > 0 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((prev) => (prev - 1 + images.length) % images.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((prev) => (prev + 1) % images.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            aria-label="Next image"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default function StateSidePanel({ state, onClose }: StateSidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state) {
      panelRef.current?.focus();
    }
  }, [state]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (state) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [state, onClose]);

  const slug = state ? stateSlugs[state.name] || state.id : '';

  return (
    <AnimatePresence>
      {state && (
        <motion.aside
          ref={panelRef}
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full lg:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 shadow-2xl overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`${state.name} details`}
          tabIndex={-1}
        >
          <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron-500 to-amber-600 flex items-center justify-center text-white text-sm font-bold">
                {state.name.charAt(0)}
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{state.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close panel"
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-5">
            <StateImageCarousel state={state} />

            <div className="grid grid-cols-2 gap-3">
              <StatBox label="Capital" value={state.capital} />
              <StatBox label="Population" value={`${(state.population / 10000000).toFixed(1)} Cr`} />
              <StatBox label="Area" value={`${state.area.toLocaleString('en-IN')} km²`} />
              <StatBox label="Districts" value={`${state.districtsCount}`} />
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-1.5">
                {state.languages.map((lang) => (
                  <Badge key={lang} variant="secondary">{lang}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Culture</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-4">
                {state.cultureDescription}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Tourist Attractions</h3>
              <div className="flex flex-wrap gap-1.5">
                {state.touristAttractions.slice(0, 6).map((attr) => (
                  <Badge key={attr} variant="outline">{attr}</Badge>
                ))}
                {state.touristAttractions.length > 6 && (
                  <Badge variant="outline">+{state.touristAttractions.length - 6} more</Badge>
                )}
              </div>
            </div>

            {state.famousFoods.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Famous Foods</h3>
                <div className="flex flex-wrap gap-1.5">
                  {state.famousFoods.map((food) => (
                    <Badge key={food} variant="outline">{food}</Badge>
                  ))}
                </div>
              </div>
            )}

            {state.festivals.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Festivals</h3>
                <div className="flex flex-wrap gap-1.5">
                  {state.festivals.map((f) => (
                    <Badge key={f} variant="outline">{f}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <Link href={`/states/${slug}`}>
                <Button variant="primary" className="w-full">
                  View Full State Page
                </Button>
              </Link>
              <Link href={`/explorer?state=${slug}`}>
                <Button variant="secondary" className="w-full">
                  Explore on Map
                </Button>
              </Link>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/80 rounded-lg p-3 border border-slate-100 dark:border-slate-700/50">
      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">{label}</div>
      <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{value}</div>
    </div>
  );
}
