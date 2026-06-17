'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ErrorState } from '@openworld/ui';
import { api } from '@/lib/api';
import ExplorerSidebar from '@/components/ExplorerSidebar';
import StateSidePanel from '@/components/StateSidePanel';
import { FloatingStatsOverlay } from '@/components/FloatingStatsOverlay';
import { TimeTravelSlider } from '@/components/TimeTravelSlider';
import { ExplorerSkeleton } from '@/components/LoadingSkeleton';
import type { State, Monument, City, HistoricalEvent } from '@openworld/types';
import type { MapMarkerType } from '@/components/InteractiveMap';
import type { Region } from '@/data/regions';

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[500px] rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />,
});

export default function ExplorerPage() {
  const [states, setStates] = useState<State[]>([]);
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMarkerTypes, setActiveMarkerTypes] = useState<MapMarkerType[]>(['states', 'monuments', 'cities']);
  const [regionFilter, setRegionFilter] = useState<Region | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timePeriod, setTimePeriod] = useState('all');
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [statesRes, monumentsRes, citiesRes, eventsRes] = await Promise.all([
          api.states.list(),
          api.monuments.list(),
          api.cities.list(),
          api.history.timeline(),
        ]);
        if (statesRes.data) setStates(statesRes.data);
        if (monumentsRes.data) setMonuments(monumentsRes.data);
        if (citiesRes.data) setCities(citiesRes.data);
        if (eventsRes.data) setEvents(eventsRes.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectState = useCallback((state: State | null) => {
    setSelectedStateId(state?.id || null);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedStateId(null);
  }, []);

  const handleMarkerTypeToggle = useCallback((type: MapMarkerType) => {
    setActiveMarkerTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }, []);

  const selectedState = useMemo(
    () => selectedStateId ? states.find((s) => s.id === selectedStateId) || null : null,
    [selectedStateId, states],
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (loading) {
    return <ExplorerSkeleton />;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="lg:hidden flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Explorer</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStats((o) => !o)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            aria-label={showStats ? 'Hide stats' : 'Show stats'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            aria-label={sidebarOpen ? 'Close filters' : 'Open filters'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm4 6a1 1 0 011-1h12a1 1 0 010 2H8a1 1 0 01-1-1zm4 6a1 1 0 011-1h8a1 1 0 010 2h-8a1 1 0 01-1-1z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ExplorerSidebar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeMarkerTypes={activeMarkerTypes}
          onMarkerTypeToggle={handleMarkerTypeToggle}
          regionFilter={regionFilter}
          onRegionFilter={setRegionFilter}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((o) => !o)}
        />

        <div className="flex-1 relative flex flex-col">
          <div className="absolute top-0 left-0 right-0 z-10">
            <FloatingStatsOverlay
              states={states}
              monuments={monuments}
              cities={cities}
              visible={showStats}
            />
          </div>

          <div className="flex-1 relative">
            <InteractiveMap
              data={{ states, monuments, cities }}
              selectedStateId={selectedStateId}
              onSelectState={handleSelectState}
              activeMarkerTypes={activeMarkerTypes}
              regionFilter={regionFilter}
              searchQuery={searchQuery}
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 hidden lg:block">
            <TimeTravelSlider
              selectedPeriod={timePeriod}
              onPeriodChange={setTimePeriod}
              events={events}
              visible
            />
          </div>
        </div>

        <StateSidePanel state={selectedState} onClose={handleClosePanel} />
      </div>
    </div>
  );
}
