'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Badge } from '@openworld/ui';
import type { MapMarkerType } from '@/components/InteractiveMap';
import type { Region } from '@/data/regions';
import { REGIONS } from '@/data/regions';

const markerTypes: { id: MapMarkerType; label: string; icon: string }[] = [
  { id: 'states', label: 'States', icon: '📍' },
  { id: 'monuments', label: 'Monuments', icon: '🕌' },
  { id: 'cities', label: 'Cities', icon: '🏙️' },
];

interface ExplorerSidebarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeMarkerTypes: MapMarkerType[];
  onMarkerTypeToggle: (type: MapMarkerType) => void;
  regionFilter: Region | null;
  onRegionFilter: (region: Region | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ExplorerSidebar({
  searchQuery, onSearchChange, activeMarkerTypes, onMarkerTypeToggle,
  regionFilter, onRegionFilter, isOpen, onToggle,
}: ExplorerSidebarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobileDrawer, setIsMobileDrawer] = useState(false);

  useEffect(() => {
    const check = () => setIsMobileDrawer(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleClear = useCallback(() => {
    onSearchChange('');
    inputRef.current?.focus();
  }, [onSearchChange]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={isMobileDrawer ? { y: '100%' } : { x: '-100%' }}
          animate={isMobileDrawer ? { y: 0 } : { x: 0 }}
          exit={isMobileDrawer ? { y: '100%' } : { x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`
            ${isMobileDrawer
              ? 'fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl max-h-[70vh] overflow-y-auto'
              : 'relative w-72 lg:w-80 h-full overflow-y-auto'}
            bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-xl
          `}
          role="complementary"
          aria-label="Explorer filters"
        >
          <div className="p-4 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Explore</h2>
              {isMobileDrawer && (
                <button onClick={onToggle} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close sidebar">
                  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            <div>
              <label htmlFor="explorer-search" className="sr-only">Search</label>
              <div className="relative">
                <Input
                  ref={inputRef}
                  id="explorer-search"
                  type="text"
                  placeholder="Search states, cities..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pr-8 w-full"
                  aria-describedby="search-instructions"
                />
                {searchQuery && (
                  <button onClick={handleClear} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Clear search">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Marker type filters">
                {markerTypes.map((mt) => {
                  const active = activeMarkerTypes.includes(mt.id);
                  return (
                    <button
                      key={mt.id}
                      onClick={() => onMarkerTypeToggle(mt.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        active
                          ? 'bg-saffron-500 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                      aria-pressed={active}
                    >
                      <span>{mt.icon}</span>
                      <span>{mt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Regions</h3>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Region filters">
                <button
                  onClick={() => onRegionFilter(null)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    regionFilter === null
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  aria-pressed={regionFilter === null}
                >
                  All India
                </button>
                {REGIONS.map((r) => {
                  const active = regionFilter === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => onRegionFilter(active ? null : r.id)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        active
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                      aria-pressed={active}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
