'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar, Footer, MonumentCard, SearchBar, LoadingSpinner, ErrorState } from '@openworld/ui';
import { api } from '@/lib/api';
import { getMonumentImage } from '@/lib/images';
import type { Monument, State } from '@openworld/types';

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

export default function MonumentsPage() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [monumentsRes, statesRes] = await Promise.all([
        api.monuments.list(),
        api.states.list(),
      ]);
      setMonuments(monumentsRes.data || []);
      setStates(statesRes.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load monuments');
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

  const filtered = useMemo(() => {
    let result = monuments;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((m) => m.name.toLowerCase().includes(q));
    }
    if (stateFilter) {
      result = result.filter((m) => m.stateId === stateFilter);
    }
    return result;
  }, [monuments, search, stateFilter]);

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
            Monuments of India
          </motion.h1>
          <motion.p
            className="text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover India&apos;s architectural heritage from ancient temples to colonial landmarks
          </motion.p>
          <motion.div
            className="max-w-md mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar
              placeholder="Search monuments by name..."
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
            <div className="mb-6">
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              >
                <option value="">All States</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {filtered.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-12">No monuments match your criteria.</p>
            ) : (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
                {filtered.map((monument) => (
                  <motion.div key={monument.id} variants={fadeUp}>
                    <MonumentCard
                      name={monument.name}
                      stateName={stateMap[monument.stateId] || 'Unknown'}
                      builtBy={monument.builtBy}
                      builtIn={monument.builtIn}
                      style={monument.style}
                      imageUrl={getMonumentImage(monument.imageUrl)}
                      slug={monument.name.toLowerCase().replace(/\s+/g, '-')}
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
