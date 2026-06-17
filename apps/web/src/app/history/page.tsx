'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/SafeImage';
import {
  Navbar, Footer, SearchBar, LoadingSpinner, ErrorState,
  Timeline, Badge, Card,
} from '@openworld/ui';
import { PERIODS } from '@openworld/shared';
import { api } from '@/lib/api';
import { getHistoryImage } from '@/lib/images';
import type { HistoricalEvent } from '@openworld/types';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

const periodColors: Record<string, string> = {};
PERIODS.forEach((p) => { periodColors[p.id] = p.color; });

const periodLabels: Record<string, string> = {};
PERIODS.forEach((p) => { periodLabels[p.id] = p.label; });

export default function HistoryPage() {
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activePeriod, setActivePeriod] = useState('all');

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.history.list();
      setEvents(res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load historical events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const filtered = useMemo(() => {
    let result = events;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q),
      );
    }
    if (activePeriod !== 'all') {
      result = result.filter((e) => e.period === activePeriod);
    }
    return result;
  }, [events, search, activePeriod]);

  const timelineEvents = useMemo(() => {
    return filtered.map((e) => ({
      year: e.year,
      title: e.title,
      description: e.description,
      period: periodLabels[e.period] || e.period,
      color: periodColors[e.period],
    }));
  }, [filtered]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchEvents} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <section className="gradient-india">
        <div className="page-container text-center py-16">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            History of India
          </motion.h1>
          <motion.p
            className="text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Journey through India&apos;s rich and diverse historical timeline
          </motion.p>
          <motion.div
            className="max-w-md mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar
              placeholder="Search historical events..."
              value={search}
              onChange={setSearch}
            />
          </motion.div>
        </div>
      </section>

      <section className="page-container">
        {loading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActivePeriod('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activePeriod === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                All
              </button>
              {PERIODS.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setActivePeriod(period.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activePeriod === period.id
                      ? 'text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                  style={
                    activePeriod === period.id
                      ? { backgroundColor: period.color }
                      : undefined
                  }
                >
                  {period.label}
                </button>
              ))}
            </div>

            {activePeriod !== 'all' ? (
              <motion.div
                key={activePeriod}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {timelineEvents.length > 0 ? (
                  <Timeline events={timelineEvents} />
                ) : (
                  <p className="text-center text-slate-500 dark:text-slate-400 py-12">No events found for this period.</p>
                )}
              </motion.div>
            ) : (
              <>
                {filtered.length === 0 ? (
                  <p className="text-center text-slate-500 dark:text-slate-400 py-12">No events match your criteria.</p>
                ) : (
                  <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
                    {filtered.map((event) => (
                      <motion.div key={event.id} variants={fadeUp}>
                        <Link href={`/history/${event.id}`} className="block">
                          <Card hoverable className="overflow-hidden">
                            {event.imageUrl && (
                              <div className="relative h-40">
                                <SafeImage src={getHistoryImage(event.imageUrl)} alt={event.title} fill fallbackSrc="/images/placeholders/history.svg" />
                              </div>
                            )}
                            <div className="p-4 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{event.year}</span>
                                <span
                                  className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
                                  style={{ backgroundColor: periodColors[event.period] || '#666' }}
                                >
                                  {periodLabels[event.period] || event.period}
                                </span>
                              </div>
                              <h3 className="font-bold text-slate-900 dark:text-white">{event.title}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{event.description}</p>
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
