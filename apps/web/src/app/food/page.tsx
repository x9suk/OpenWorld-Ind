'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar, Footer, FoodCard, SearchBar, LoadingSpinner, ErrorState, Badge } from '@openworld/ui';
import { api } from '@/lib/api';
import { resolveFoodImage } from '@/lib/imageResolver';
import type { Food, State } from '@openworld/types';

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

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [foodsRes, statesRes] = await Promise.all([
        api.foods.list(),
        api.states.list(),
      ]);
      setFoods(foodsRes.data || []);
      setStates(statesRes.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load foods');
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

  const categories = useMemo(() => {
    const cats = new Set<string>();
    foods.forEach((f) => { if (f.category) cats.add(f.category); });
    return Array.from(cats).sort();
  }, [foods]);

  const filtered = useMemo(() => {
    let result = foods;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((f) => f.name.toLowerCase().includes(q));
    }
    if (stateFilter) {
      result = result.filter((f) => f.stateId === stateFilter);
    }
    if (categoryFilter) {
      result = result.filter((f) => f.category === categoryFilter);
    }
    if (vegOnly) {
      result = result.filter((f) => f.isVegetarian);
    }
    return result;
  }, [foods, search, stateFilter, categoryFilter, vegOnly]);

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
            Foods of India
          </motion.h1>
          <motion.p
            className="text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore the rich culinary diversity across Indian states and regions
          </motion.p>
          <motion.div
            className="max-w-md mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar
              placeholder="Search foods by name..."
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Vegetarian only
              </label>
            </div>

            {filtered.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-12">No foods match your criteria.</p>
            ) : (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
                {filtered.map((food) => (
                  <motion.div key={food.id} variants={fadeUp}>
                    <FoodCard
                      name={food.name}
                      stateName={stateMap[food.stateId] || 'Unknown'}
                      category={food.category}
                      isVegetarian={food.isVegetarian}
                      spiceLevel={food.spiceLevel as 'mild' | 'medium' | 'hot' | 'very-hot'}
                      imageUrl={resolveFoodImage(food)}
                      slug={food.name.toLowerCase().replace(/\s+/g, '-')}
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
