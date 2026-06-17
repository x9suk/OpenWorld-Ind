'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar, Footer, MonumentCard, LoadingSpinner, ErrorState, Breadcrumbs } from '@openworld/ui';
import { getStateBySlug } from '@openworld/shared';
import { api } from '@/lib/api';
import { getMonumentImage } from '@/lib/images';
import type { Monument } from '@openworld/types';

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

export default function StateMonumentsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const stateName = getStateBySlug(slug) || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.states.monuments(slug);
      setMonuments(res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load monuments');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchMonuments(); }, [fetchMonuments]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchMonuments} />
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
            { label: 'Monuments' },
          ]}
        />
      </div>

      <section className="page-container">
        <motion.h1
          className="text-3xl font-bold text-slate-900 dark:text-white mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Monuments of {stateName}
        </motion.h1>

        {loading ? (
          <LoadingSpinner size="lg" />
        ) : monuments.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-12">No monuments found.</p>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
            {monuments.map((m) => (
              <motion.div key={m.id} variants={fadeUp}>
                <MonumentCard
                  name={m.name}
                  stateName={stateName}
                  builtBy={m.builtBy}
                  builtIn={m.builtIn}
                  style={m.style}
                  imageUrl={getMonumentImage(m.imageUrl)}
                  slug={m.name.toLowerCase().replace(/\s+/g, '-')}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
