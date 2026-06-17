'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import type { HistoricalEvent } from '@openworld/types';

const TIME_PERIODS = [
  { id: 'all', label: 'All Time', range: [0, 2024] as [number, number] },
  { id: 'ancient', label: 'Ancient (before 500 CE)', range: [-3000, 500] as [number, number] },
  { id: 'medieval', label: 'Medieval (500-1500 CE)', range: [500, 1500] as [number, number] },
  { id: 'early-modern', label: 'Early Modern (1500-1800)', range: [1500, 1800] as [number, number] },
  { id: 'modern', label: 'Modern (1800-1947)', range: [1800, 1947] as [number, number] },
  { id: 'post-independence', label: 'Post-Independence (1947+)', range: [1947, 2024] as [number, number] },
];

interface TimeTravelSliderProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  events: HistoricalEvent[];
  visible: boolean;
}

export function TimeTravelSlider({ selectedPeriod, onPeriodChange, events, visible }: TimeTravelSliderProps) {
  const currentPeriodEvents = useCallback(() => {
    if (selectedPeriod === 'all') return events;
    const period = TIME_PERIODS.find((p) => p.id === selectedPeriod);
    if (!period) return events;
    const [start, end] = period.range;
    return events.filter((e) => {
      const year = parseInt(e.year);
      return year >= start && year <= end;
    });
  }, [selectedPeriod, events]);

  const filteredEvents = currentPeriodEvents();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="pointer-events-none"
    >
      <div className="px-3 pb-3">
        <div className="pointer-events-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Time Travel
            </h3>
            {selectedPeriod !== 'all' && (
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                {filteredEvents.length} events
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Time period filters">
            {TIME_PERIODS.map((period) => {
              const active = selectedPeriod === period.id;
              return (
                <button
                  key={period.id}
                  onClick={() => onPeriodChange(period.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                    active
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  aria-pressed={active}
                >
                  {period.label}
                </button>
              );
            })}
          </div>
          {selectedPeriod !== 'all' && filteredEvents.length > 0 && (
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 max-h-24 overflow-y-auto space-y-1">
              {filteredEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-start gap-2 text-[11px]">
                  <span className="shrink-0 font-mono text-amber-600 dark:text-amber-400 font-bold">
                    {event.year}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 line-clamp-1">
                    {event.title}
                  </span>
                </div>
              ))}
              {filteredEvents.length > 5 && (
                <p className="text-[10px] text-slate-400 text-center">
                  +{filteredEvents.length - 5} more events
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
