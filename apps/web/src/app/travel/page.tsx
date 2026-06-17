'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar, Footer, LoadingSpinner, ErrorState } from '@openworld/ui';
import { api } from '@/lib/api';

const typeFilters = ['All', 'Heritage', 'Food', 'Weekend', 'Adventure'];
const durationFilters = ['Any', '1 Day', '2-3 Days', '4-7 Days', '7+ Days'];

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

interface Itinerary {
  id: string;
  title: string;
  description: string;
  type: string;
  duration: number;
  totalCost: number;
  state: string;
}

export default function TravelPage() {
  const router = useRouter();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [activeDuration, setActiveDuration] = useState('Any');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [itinRes, statesRes] = await Promise.all([api.itineraries.list(), api.states.list()]);
      setItineraries(itinRes.data || []);
      const stateData = statesRes.data || [];
      setStates(stateData.map((s: any) => s.name));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load itineraries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    return itineraries.filter((it) => {
      if (selectedState && it.state !== selectedState) return false;
      if (activeType !== 'All' && it.type !== activeType) return false;
      if (activeDuration !== 'Any') {
        if (activeDuration === '1 Day' && it.duration !== 1) return false;
        if (activeDuration === '2-3 Days' && (it.duration < 2 || it.duration > 3)) return false;
        if (activeDuration === '4-7 Days' && (it.duration < 4 || it.duration > 7)) return false;
        if (activeDuration === '7+ Days' && it.duration <= 7) return false;
      }
      return true;
    });
  }, [itineraries, selectedState, activeType, activeDuration]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchData} />
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
            Travel Planner
          </motion.h1>
          <motion.p
            className="text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Plan your perfect India trip
          </motion.p>
        </div>
      </section>

      <section className="page-container">
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
          >
            <option value="">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeType === t
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {durationFilters.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDuration(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeDuration === d
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
            {filtered.map((it) => (
              <motion.div
                key={it.id}
                variants={fadeUp}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 card-hover cursor-pointer"
                onClick={() => router.push(`/travel/${it.id}`)}
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{it.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{it.state}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{it.description}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2.5 py-0.5 rounded-full font-medium">
                    {it.type}
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2.5 py-0.5 rounded-full font-medium">
                    {it.duration} {it.duration === 1 ? 'day' : 'days'}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    ₹{it.totalCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-slate-500 dark:text-slate-400 py-12">No itineraries match your filters.</p>
        )}
      </section>

      <Footer />
    </div>
  );
}
