'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/SafeImage';
import { Navbar, Footer, FestivalCard, SearchBar, LoadingSpinner, ErrorState, Badge, Card } from '@openworld/ui';
import { api } from '@/lib/api';
import { getFestivalImage } from '@/lib/images';
import type { Festival, State } from '@openworld/types';

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

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const currentMonthIndex = new Date().getMonth();
const currentMonth = MONTHS[currentMonthIndex];

export default function FestivalsPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [festivalsRes, statesRes] = await Promise.all([
        api.festivals.list(),
        api.states.list(),
      ]);
      setFestivals(festivalsRes.data || []);
      setStates(statesRes.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load festivals');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const stateMap = useMemo(() => {
    const map: Record<string, string> = {};
    states.forEach((s) => { map[s.id] = s.name; });
    return map;
  }, [states]);

  const types = useMemo(() => {
    const t = new Set<string>();
    festivals.forEach((f) => { if (f.type) t.add(f.type); });
    return Array.from(t).sort();
  }, [festivals]);

  const filtered = useMemo(() => {
    let result = festivals;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((f) => f.name.toLowerCase().includes(q));
    }
    if (stateFilter) {
      result = result.filter((f) => f.stateId === stateFilter);
    }
    if (monthFilter) {
      result = result.filter((f) => f.month === monthFilter);
    }
    if (typeFilter) {
      result = result.filter((f) => f.type === typeFilter);
    }
    return result;
  }, [festivals, search, stateFilter, monthFilter, typeFilter]);

  const currentMonthFestivals = useMemo(() => {
    return festivals.filter((f) => f.month === currentMonth);
  }, [festivals]);

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
            Festivals of India
          </motion.h1>
          <motion.p
            className="text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Celebrate India&apos;s vibrant festivals across every state and community
          </motion.p>
          <motion.div
            className="max-w-md mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar
              placeholder="Search festivals by name..."
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
            {currentMonthFestivals.length > 0 && (
              <motion.div {...fadeUp} className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Festival Calendar &mdash; {currentMonth}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentMonthFestivals.slice(0, 3).map((f) => (
                    <Link key={f.id} href={`/festivals/${f.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                      <Card hoverable className="overflow-hidden border-2 border-yellow-400 dark:border-yellow-600">
                        <div className="relative h-36">
                          <SafeImage src={f.imageUrl} alt={f.name} fill fallbackSrc="/images/placeholders/festival.svg" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 left-3">
                            <h3 className="text-lg font-bold text-white">{f.name}</h3>
                          </div>
                        </div>
                        <div className="p-3 flex flex-wrap gap-1">
                          <Badge variant="info" size="sm">{f.type}</Badge>
                          <Badge variant="warning" size="sm">{f.month}</Badge>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="flex flex-wrap gap-3 mb-6 items-center">
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              >
                <option value="">All States</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>

              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              >
                <option value="">All Months</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              >
                <option value="">All Types</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {filtered.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-12">No festivals match your criteria.</p>
            ) : (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
                {filtered.map((festival) => (
                  <motion.div key={festival.id} variants={fadeUp}>
                    <FestivalCard
                      name={festival.name}
                      stateName={stateMap[festival.stateId] || 'Unknown'}
                      month={festival.month}
                      type={festival.type}
                      imageUrl={getFestivalImage(festival.imageUrl)}
                      slug={festival.name.toLowerCase().replace(/\s+/g, '-')}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
