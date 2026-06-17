'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/SafeImage';
import {
  Navbar, Footer, LoadingSpinner, ErrorState, Breadcrumbs,
  Badge, Card, PhotoGallery, FestivalCard,
} from '@openworld/ui';
import { api } from '@/lib/api';
import { getFestivalImage } from '@/lib/images';
import type { Festival, State } from '@openworld/types';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

export default function FestivalDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [festival, setFestival] = useState<Festival | null>(null);
  const [states, setStates] = useState<State[]>([]);
  const [related, setRelated] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFestival = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [festivalRes, statesRes, festivalsRes] = await Promise.all([
        api.festivals.get(slug),
        api.states.list(),
        api.festivals.list(),
      ]);
      const festData = festivalRes.data || festivalRes;
      setFestival(festData);
      setStates(statesRes.data || []);
      const allFestivals: Festival[] = festivalsRes.data || [];
      setRelated(allFestivals.filter((f) => f.stateId === festData.stateId && f.id !== festData.id).slice(0, 6));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load festival');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchFestival(); }, [fetchFestival]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchFestival} />
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || !festival) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <LoadingSpinner size="lg" />
        <Footer />
      </div>
    );
  }

  const stateName = states.find((s) => s.id === festival.stateId)?.name || 'Unknown';

  const galleryImages = [
    ...(festival.photoUrls?.length ? festival.photoUrls.map((url) => ({ url, caption: festival.name })) : []),
    ...(festival.imageUrl ? [{ url: festival.imageUrl, caption: festival.name }] : []),
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <div className="page-container pb-0">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Festivals', href: '/festivals' },
            { label: festival.name },
          ]}
        />
      </div>

      <section className="relative overflow-hidden">
        <div className="relative h-64 md:h-80">
          <SafeImage src={getFestivalImage(festival.imageUrl)} alt={festival.name} fill fallbackSrc="/images/placeholders/festival.svg" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{festival.name}</h1>
              <p className="text-lg text-gray-200 mb-3">{stateName}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="info" size="md">{festival.type}</Badge>
                <Badge variant="default" size="md">{festival.month}</Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {festival.description && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Description</h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{festival.description}</p>
                </Card>
              </motion.div>
            )}

            {festival.traditions && festival.traditions.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Traditions</h2>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    {festival.traditions.map((tradition, i) => (
                      <li key={i}>{tradition}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}

            {festival.dates && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Dates</h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{festival.dates}</p>
                </Card>
              </motion.div>
            )}

            {galleryImages.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Photo Gallery</h2>
                  <PhotoGallery images={galleryImages} />
                </Card>
              </motion.div>
            )}

            {related.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">More Festivals from {stateName}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.slice(0, 4).map((f) => (
                      <FestivalCard
                        key={f.id}
                        name={f.name}
                        stateName={stateName}
                        month={f.month}
                        type={f.type}
                        imageUrl={getFestivalImage(f.imageUrl)}
                        slug={f.name.toLowerCase().replace(/\s+/g, '-')}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div {...fadeUp}>
              <Card className="p-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Quick Info</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Type</span>
                    <p className="font-medium text-slate-900 dark:text-white">{festival.type}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Month</span>
                    <p className="font-medium text-slate-900 dark:text-white">{festival.month}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">State</span>
                    <p className="font-medium text-slate-900 dark:text-white">{stateName}</p>
                  </div>
                  {festival.isNationalHoliday !== undefined && (
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">National Holiday</span>
                      <p className="font-medium text-slate-900 dark:text-white">{festival.isNationalHoliday ? 'Yes' : 'No'}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
