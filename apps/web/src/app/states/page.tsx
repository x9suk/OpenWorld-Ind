'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar, Footer, StateCard, SearchBar, LoadingSpinner, ErrorState } from '@openworld/ui';
import { stateSlugs } from '@openworld/shared';
import { api } from '@/lib/api';
import { resolveStateImage } from '@/lib/imageResolver';
import type { State } from '@openworld/types';

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

export default function StatesPage() {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchStates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.states.list();
      setStates(res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load states');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStates(); }, [fetchStates]);

  const filtered = useMemo(() => {
    if (!search.trim()) return states;
    const q = search.toLowerCase();
    return states.filter((s) => s.name.toLowerCase().includes(q));
  }, [states, search]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchStates} />
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
            States of India
          </motion.h1>
          <motion.p
            className="text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore the 28 states and 8 union territories that make India incredible
          </motion.p>
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar
              placeholder="Filter states by name..."
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
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
            {filtered.map((state) => (
              <motion.div key={state.id} variants={fadeUp}>
                <StateCard
                  name={state.name}
                  capital={state.capital}
                  population={(state.population / 10000000).toFixed(1) + ' Cr'}
                  area={state.area.toLocaleString('en-IN') + ' km²'}
                  languageCount={state.languages.length}
                  imageUrl={resolveStateImage(state)}
                  slug={stateSlugs[state.name] || state.name.toLowerCase().replace(/\s+/g, '-')}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-slate-500 dark:text-slate-400 py-12">
            No states match your filter.
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
}
