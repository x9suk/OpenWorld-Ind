'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Navbar, Footer, LoadingSpinner, ErrorState, Badge, Breadcrumbs } from '@openworld/ui';
import { api } from '@/lib/api';

const MapWithNoSSR = dynamic(() => import('@/components/MapWithNoSSR'), { ssr: false });

interface DayPlan {
  day: number;
  title: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

interface ItineraryData {
  id: string;
  title: string;
  description: string;
  type: string;
  duration: number;
  totalCost: number;
  state: string;
  days: DayPlan[];
  latitude?: number;
  longitude?: number;
}

export default function TravelDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItinerary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.itineraries.get(id);
      setItinerary(res.data || res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load itinerary');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchItinerary(); }, [fetchItinerary]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchItinerary} />
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || !itinerary) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <LoadingSpinner size="lg" />
        <Footer />
      </div>
    );
  }

  const markers = itinerary.latitude && itinerary.longitude
    ? [{ position: [itinerary.latitude, itinerary.longitude] as [number, number], title: itinerary.title }]
    : [];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <div className="page-container pb-0">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Travel', href: '/travel' },
            { label: itinerary.title },
          ]}
        />
      </div>

      <section className="gradient-india">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{itinerary.title}</h1>
            <p className="text-slate-700 dark:text-slate-200 mb-4 max-w-2xl">{itinerary.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2.5 py-0.5 rounded-full font-medium">
                {itinerary.type}
              </span>
              <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2.5 py-0.5 rounded-full font-medium">
                {itinerary.duration} {itinerary.duration === 1 ? 'day' : 'days'}
              </span>
              <Badge variant="info">₹{itinerary.totalCost.toLocaleString('en-IN')}</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-container">
        {itinerary.latitude && itinerary.longitude && (
          <motion.div
            className="h-[300px] rounded-xl overflow-hidden mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <MapWithNoSSR
              center={[itinerary.latitude, itinerary.longitude]}
              zoom={8}
              markers={[{ position: [itinerary.latitude, itinerary.longitude] as [number, number], title: itinerary.title }]}
            />
          </motion.div>
        )}

        <div className="space-y-6">
          {(itinerary.days || []).map((day) => (
            <motion.div
              key={day.day}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {day.day}
                </span>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{day.title}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Activities</h4>
                  <ul className="space-y-1">
                    {(day.activities || []).map((a, i) => (
                      <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Meals</h4>
                  <ul className="space-y-1">
                    {(day.meals || []).map((m, i) => (
                      <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Accommodation</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{day.accommodation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
