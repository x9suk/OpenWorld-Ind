'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar, Footer, FoodCard, LoadingSpinner, ErrorState, Breadcrumbs } from '@openworld/ui';
import { getStateBySlug } from '@openworld/shared';
import { api } from '@/lib/api';
import { getFoodImage } from '@/lib/images';
import type { Food } from '@openworld/types';

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

export default function StateFoodsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const stateName = getStateBySlug(slug) || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchFoods = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.states.foods(slug);
      setFoods(res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load foods');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchFoods(); }, [fetchFoods]);

  const categories = useMemo(() => {
    const cats = new Set(foods.map((f) => f.category));
    return Array.from(cats).sort();
  }, [foods]);

  const filtered = useMemo(() => {
    if (!categoryFilter) return foods;
    return foods.filter((f) => f.category === categoryFilter);
  }, [foods, categoryFilter]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchFoods} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <div className="page-container pb-0">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'States', href: '/states' },
            { label: stateName, href: `/states/${slug}` },
            { label: 'Foods' },
          ]}
        />
      </div>

      <section className="page-container">
        <motion.h1
          className="text-3xl font-bold text-slate-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Foods of {stateName}
        </motion.h1>

        {loading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <>
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setCategoryFilter('')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    !categoryFilter
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      categoryFilter === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-12">No foods found.</p>
            ) : (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
                {filtered.map((f) => (
                  <motion.div key={f.id} variants={fadeUp}>
                    <FoodCard
                      name={f.name}
                      stateName={stateName}
                      category={f.category}
                      isVegetarian={f.isVegetarian}
                      spiceLevel={f.spiceLevel as 'mild' | 'medium' | 'hot' | 'very-hot'}
                      imageUrl={getFoodImage(f.imageUrl)}
                      slug={f.name.toLowerCase().replace(/\s+/g, '-')}
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
