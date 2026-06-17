'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/SafeImage';
import {
  Navbar, Footer, LoadingSpinner, ErrorState, Breadcrumbs,
  Badge, Card, Button, MonumentCard,
} from '@openworld/ui';
import { api } from '@/lib/api';
import { getMonumentImage } from '@/lib/images';
import type { Monument, State } from '@openworld/types';

const MapWithNoSSR = dynamic(() => import('@/components/MapWithNoSSR'), { ssr: false });

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const tabs = ['Overview', 'History', 'Architecture', 'Visitor Info'] as const;

function ShareButton({ title }: { title: string }) {
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }, [title]);
  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
      aria-label="Share this page"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      Share
    </button>
  );
}

export default function MonumentDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [monument, setMonument] = useState<Monument | null>(null);
  const [states, setStates] = useState<State[]>([]);
  const [related, setRelated] = useState<Monument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Overview');
  const [galleryIndex, setGalleryIndex] = useState(0);

  const fetchMonument = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [monumentRes, statesRes, monumentsRes] = await Promise.all([
        api.monuments.get(slug),
        api.states.list(),
        api.monuments.list(),
      ]);
      const monData = monumentRes.data || monumentRes;
      setMonument(monData);
      setStates(statesRes.data || []);
      const allMonuments: Monument[] = monumentsRes.data || [];
      setRelated(allMonuments.filter((m) => m.stateId === monData.stateId && m.id !== monData.id).slice(0, 6));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load monument');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchMonument(); }, [fetchMonument]);

  const stateName = states.find((s) => s.id === monument?.stateId)?.name || 'Unknown';

  const galleryImages = useMemo(() => {
    const fallback = '/images/placeholders/monument.svg';
    const imgs = monument?.imageUrls?.length
      ? monument.imageUrls.map((url) => ({ url, caption: monument.name }))
      : [];
    if (monument?.imageUrl && !imgs.some((i) => i.url === monument.imageUrl)) {
      imgs.push({ url: monument.imageUrl, caption: monument.name });
    }
    if (imgs.length === 0) {
      imgs.push({ url: fallback, caption: monument?.name || '' });
    }
    return imgs;
  }, [monument]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchMonument} />
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || !monument) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <LoadingSpinner size="lg" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="relative h-72 md:h-96">
          <SafeImage src={getMonumentImage(monument.imageUrl)} alt={monument.name} fill fallbackSrc="/images/placeholders/monument.svg" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="info" size="md">{monument.style}</Badge>
                <ShareButton title={monument.name} />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                {monument.name}
              </h1>
              <p className="text-lg text-gray-200 drop-shadow">
                {stateName} &middot; Built {monument.builtIn}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="page-container pb-0">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Monuments', href: '/monuments' },
            { label: monument.name },
          ]}
        />
      </div>

      <section className="page-container">
        <motion.div className="flex flex-wrap gap-3 mb-8" {...fadeUp}>
          <Badge variant="info" size="md">Built by: {monument.builtBy}</Badge>
          <Badge variant="info" size="md">Built in: {monument.builtIn}</Badge>
          <Badge variant="info" size="md">Style: {monument.style}</Badge>
          <Badge variant="info" size="md">{monument.entryFee}</Badge>
        </motion.div>
      </section>

      <div className="border-b border-slate-200 dark:border-slate-700">
        <div className="page-container py-0">
          <nav className="flex gap-6 -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <section className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'Overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
                {monument.description && (
                  <motion.div {...fadeUp}>
                    <Card className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Overview</h2>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{monument.description}</p>
                    </Card>
                  </motion.div>
                )}
                {monument.visitorInfo && (
                  <motion.div {...fadeUp}>
                    <Card className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Visitor Information</h2>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{monument.visitorInfo}</p>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'History' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
                {monument.history && (
                  <motion.div {...fadeUp}>
                    <Card className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">History</h2>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{monument.history}</p>
                    </Card>
                  </motion.div>
                )}
                {monument.constructionDetails && (
                  <motion.div {...fadeUp}>
                    <Card className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Construction Details</h2>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{monument.constructionDetails}</p>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'Architecture' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
                {monument.architecture && (
                  <motion.div {...fadeUp}>
                    <Card className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Architecture</h2>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{monument.architecture}</p>
                    </Card>
                  </motion.div>
                )}
                {monument.style && (
                  <motion.div {...fadeUp}>
                    <Card className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Architectural Style</h2>
                      <Badge variant="info" size="md">{monument.style}</Badge>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'Visitor Info' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
                <motion.div {...fadeUp}>
                  <Card className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Visitor Information</h2>
                    <div className="space-y-4">
                      {monument.entryFee && <InfoRow label="Entry Fee" value={monument.entryFee} />}
                      {monument.timings && <InfoRow label="Timings" value={monument.timings} />}
                      {monument.bestTimeToVisit && <InfoRow label="Best Time to Visit" value={monument.bestTimeToVisit} />}
                    </div>
                  </Card>
                </motion.div>
                {monument.nearbyAttractions && monument.nearbyAttractions.length > 0 && (
                  <motion.div {...fadeUp}>
                    <Card className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Nearby Attractions</h2>
                      <div className="flex flex-wrap gap-2">
                        {monument.nearbyAttractions.map((att, i) => (
                          <Badge key={i} variant="default">{att}</Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}

            {galleryImages.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Gallery</h2>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <SafeImage src={galleryImages[galleryIndex].url} alt={monument.name} fill fallbackSrc="/images/placeholders/monument.svg" />
                    {galleryImages.length > 1 && (
                      <>
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                          <div className="flex justify-center gap-1.5">
                            {galleryImages.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setGalleryIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === galleryIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                                aria-label={`View image ${i + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                          aria-label="Previous"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                          onClick={() => setGalleryIndex((prev) => (prev + 1) % galleryImages.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                          aria-label="Next"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {related.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">More Monuments in {stateName}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.slice(0, 4).map((m) => (
                      <MonumentCard
                        key={m.id}
                        name={m.name}
                        stateName={stateName}
                        builtBy={m.builtBy}
                        builtIn={m.builtIn}
                        style={m.style}
                        imageUrl={getMonumentImage(m.imageUrl)}
                        slug={m.name.toLowerCase().replace(/\s+/g, '-')}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            {monument.coordinates && (
              <motion.div {...fadeUp}>
                <Card className="p-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Location</h2>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <MapWithNoSSR
                      center={[monument.coordinates.lat, monument.coordinates.lng]}
                      markers={[{ position: [monument.coordinates.lat, monument.coordinates.lng], title: monument.name }]}
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.div {...fadeUp}>
              <Card className="p-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Quick Info</h2>
                <div className="space-y-3 text-sm">
                  <InfoRow label="Architectural Style" value={monument.style} />
                  <InfoRow label="Built By" value={monument.builtBy} />
                  <InfoRow label="Built In" value={monument.builtIn} />
                  {monument.coordinates && (
                    <InfoRow label="Coordinates" value={`${monument.coordinates.lat.toFixed(4)}, ${monument.coordinates.lng.toFixed(4)}`} />
                  )}
                </div>
              </Card>
            </motion.div>

            <motion.div {...fadeUp}>
              <Card className="p-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Visit</h2>
                <div className="space-y-2">
                  <Link href={`/states/${stateName.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button variant="primary" className="w-full text-sm">View State Page</Button>
                  </Link>
                  <Link href={`/explorer?monument=${slug}`}>
                    <Button variant="secondary" className="w-full text-sm">Find on Map</Button>
                  </Link>
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <span className="text-slate-500 dark:text-slate-400 text-sm">{label}</span>
      <span className="font-medium text-slate-900 dark:text-white text-sm text-right">{value}</span>
    </div>
  );
}
