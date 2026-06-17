'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/SafeImage';
import {
  Navbar, Footer, LoadingSpinner, ErrorState, Breadcrumbs,
  Badge, Card, Button,
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

const periodColors: Record<string, string> = {};
PERIODS.forEach((p) => { periodColors[p.id] = p.color; });

const periodLabels: Record<string, string> = {};
PERIODS.forEach((p) => { periodLabels[p.id] = p.label; });

export default function HistoryEventDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [event, setEvent] = useState<HistoricalEvent | null>(null);
  const [allEvents, setAllEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [eventRes, allRes] = await Promise.all([
        api.history.get(id),
        api.history.list(),
      ]);
      setEvent(eventRes.data || eventRes);
      setAllEvents(allRes.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load historical event');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchEvent(); }, [fetchEvent]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchEvent} />
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || !event) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <LoadingSpinner size="lg" />
        <Footer />
      </div>
    );
  }

  const sorted = [...allEvents].sort((a, b) => parseInt(a.year) - parseInt(b.year));
  const currentIndex = sorted.findIndex((e) => e.id === event.id);
  const prevEvent = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const nextEvent = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  const relatedEvents = allEvents.filter(
    (e) => e.period === event.period && e.id !== event.id,
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <div className="page-container pb-0">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'History', href: '/history' },
            { label: event.title },
          ]}
        />
      </div>

      <section className="relative overflow-hidden gradient-india">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
                  {event.title}
                </h1>
                <p className="text-lg text-slate-700 dark:text-slate-200 mt-1">
                  {event.year}
                </p>
              </div>
              <Link href="/history">
                <Button variant="outline">&larr; Back to History</Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white"
                style={{ backgroundColor: periodColors[event.period] || '#666' }}
              >
                {periodLabels[event.period] || event.period}
              </span>
              {event.category && (
                <Badge variant="info">{event.category}</Badge>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {event.description && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Description</h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{event.description}</p>
                </Card>
              </motion.div>
            )}

            {event.imageUrl && (
              <motion.div {...fadeUp}>
                <Card className="p-4 overflow-hidden relative">
                  <SafeImage src={getHistoryImage(event.imageUrl)} alt={event.title} fill fallbackSrc="/images/placeholders/history.svg" className="rounded-lg" />
                </Card>
              </motion.div>
            )}

            {relatedEvents.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    Related Events from {periodLabels[event.period] || event.period}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedEvents.map((re) => (
                      <Link key={re.id} href={`/history/${re.id}`} className="block">
                        <Card hoverable className="p-4">
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{re.year}</span>
                          <h3 className="font-bold text-slate-900 dark:text-white mt-1">{re.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{re.description}</p>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.div {...fadeUp}>
              <Card className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    {prevEvent ? (
                      <Link href={`/history/${prevEvent.id}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <div className="text-left">
                          <span className="text-xs text-slate-500 dark:text-slate-400">Previous</span>
                          <p className="text-sm font-medium">{prevEvent.title}</p>
                        </div>
                      </Link>
                    ) : (
                      <div />
                    )}
                  </div>
                  <div>
                    {nextEvent ? (
                      <Link href={`/history/${nextEvent.id}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        <div className="text-right">
                          <span className="text-xs text-slate-500 dark:text-slate-400">Next</span>
                          <p className="text-sm font-medium">{nextEvent.title}</p>
                        </div>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div {...fadeUp}>
              <Card className="p-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Quick Info</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Year</span>
                    <p className="font-medium text-slate-900 dark:text-white">{event.year}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Period</span>
                    <p className="font-medium text-slate-900 dark:text-white">{periodLabels[event.period] || event.period}</p>
                  </div>
                  {event.category && (
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Category</span>
                      <p className="font-medium text-slate-900 dark:text-white">{event.category}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {event.personalities && event.personalities.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Personalities</h2>
                  <div className="flex flex-wrap gap-2">
                    {event.personalities.map((person, i) => (
                      <Badge key={i} variant="default">{person}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {event.locations && event.locations.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Locations</h2>
                  <div className="flex flex-wrap gap-2">
                    {event.locations.map((loc, i) => (
                      <Badge key={i} variant="info">{loc}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
