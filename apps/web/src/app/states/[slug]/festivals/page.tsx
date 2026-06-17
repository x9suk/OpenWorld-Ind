'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar, Footer, FestivalCard, LoadingSpinner, ErrorState, Breadcrumbs } from '@openworld/ui';
import { getStateBySlug } from '@openworld/shared';
import { api } from '@/lib/api';
import { getFestivalImage } from '@/lib/images';
import type { Festival } from '@openworld/types';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

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

export default function StateFestivalsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const stateName = getStateBySlug(slug) || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthFilter, setMonthFilter] = useState('');

  const fetchFestivals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.states.festivals(slug);
      setFestivals(res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load festivals');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchFestivals(); }, [fetchFestivals]);

  const filtered = useMemo(() => {
    if (!monthFilter) return festivals;
    return festivals.filter((fe) => fe.month === monthFilter);
  }, [festivals, monthFilter]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchFestivals} />
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
            { label: 'Festivals' },
          ]}
        />
      </div>

      <section className="page-container">
        <motion.h1
          className="text-3xl font-bold text-slate-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Festivals of {stateName}
        </motion.h1>

        {loading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setMonthFilter('')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !monthFilter
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                All
              </button>
              {MONTHS.map((month) => (
                <button
                  key={month}
                  onClick={() => setMonthFilter(month)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    monthFilter === month
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-12">No festivals found.</p>
            ) : (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
                {filtered.map((fe) => (
                  <motion.div key={fe.id} variants={fadeUp}>
                    <FestivalCard
                      name={fe.name}
                      stateName={stateName}
                      month={fe.month}
                      type={fe.type}
                      imageUrl={getFestivalImage(fe.imageUrl)}
                      slug={fe.name.toLowerCase().replace(/\s+/g, '-')}
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
