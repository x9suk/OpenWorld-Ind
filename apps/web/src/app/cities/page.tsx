'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer, CityCard, SearchBar, LoadingSpinner, ErrorState, Badge } from '@openworld/ui';
import { stateSlugs } from '@openworld/shared';
import { api } from '@/lib/api';
import { getCityImage } from '@/lib/images';
import type { City, State } from '@openworld/types';

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

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [citiesRes, statesRes] = await Promise.all([
        api.cities.list(),
        api.states.list(),
      ]);
      setCities(citiesRes.data || []);
      setStates(statesRes.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cities');
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
    let result = cities;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (stateFilter) {
      result = result.filter((c) => c.stateId === stateFilter);
    }
    return result;
  }, [cities, search, stateFilter]);

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
            Cities of India
          </motion.h1>
          <motion.p
            className="text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover cities across every state and union territory
          </motion.p>
          <motion.div
            className="max-w-md mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar
              placeholder="Search cities by name..."
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
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setStateFilter('')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !stateFilter
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                All States
              </button>
              {states.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStateFilter(s.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    stateFilter === s.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-12">No cities match your criteria.</p>
            ) : (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
                {filtered.map((city) => (
                  <motion.div key={city.id} variants={fadeUp}>
                    <CityCard
                      name={city.name}
                      stateName={stateMap[city.stateId] || 'Unknown'}
                      population={city.population.toLocaleString('en-IN')}
                      famousPlaces={city.famousPlaces || []}
                      imageUrl={getCityImage(city.imageUrl)}
                      slug={city.name.toLowerCase().replace(/\s+/g, '-')}
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
