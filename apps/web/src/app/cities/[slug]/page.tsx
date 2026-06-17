'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/SafeImage';
import {
  Navbar, Footer, LoadingSpinner, ErrorState, Breadcrumbs,
  Badge, Card, Button, MonumentCard,
} from '@openworld/ui';
import { api } from '@/lib/api';
import { getCityImage, getMonumentImage } from '@/lib/images';
import type { City, Monument, State } from '@openworld/types';

const MapWithNoSSR = dynamic(() => import('@/components/MapWithNoSSR'), { ssr: false });

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

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
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      aria-label="Share this page"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      Share
    </button>
  );
}

export default function CityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [city, setCity] = useState<City | null>(null);
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCity = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [cityRes, monumentsRes, statesRes] = await Promise.all([
        api.cities.get(slug),
        api.monuments.list(),
        api.states.list(),
      ]);
      const cityData = cityRes.data || cityRes;
      setCity(cityData);
      setStates(statesRes.data || []);
      const allMonuments: Monument[] = monumentsRes.data || [];
      setMonuments(allMonuments.filter((m) => m.stateId === cityData.stateId || m.cityId === cityData.id).slice(0, 4));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load city');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchCity(); }, [fetchCity]);

  const stateName = states.find((s) => s.id === city?.stateId)?.name || '';

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchCity} />
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || !city) {
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

      {city.imageUrl && (
        <section className="relative overflow-hidden">
          <div className="relative h-64 md:h-80">
            <SafeImage src={getCityImage(city.imageUrl)} alt={city.name} fill fallbackSrc="/images/placeholders/city.svg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <ShareButton title={city.name} />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                  {city.name}
                </h1>
                {stateName && (
                  <p className="text-lg text-gray-200 drop-shadow">{stateName}, India</p>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {!city.imageUrl && (
        <section className="relative overflow-hidden gradient-india">
          <div className="page-container py-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
                    {city.name}
                  </h1>
                  {stateName && (
                    <p className="text-lg text-slate-700 dark:text-slate-200 mt-1">{stateName}, India</p>
                  )}
                </div>
                <ShareButton title={city.name} />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <div className="page-container pb-0">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Cities', href: '/cities' },
            { label: city.name },
          ]}
        />
      </div>

      <section className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {city.description && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About</h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{city.description}</p>
                </Card>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {city.population && (
                <motion.div {...fadeUp}>
                  <Card className="p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Population</h3>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{city.population.toLocaleString('en-IN')}</p>
                  </Card>
                </motion.div>
              )}
              {city.touristAttractions && (
                <motion.div {...fadeUp}>
                  <Card className="p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Attractions</h3>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{city.touristAttractions.length}</p>
                  </Card>
                </motion.div>
              )}
            </div>

            {city.famousPlaces && city.famousPlaces.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Famous Places</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {city.famousPlaces.map((place, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="text-sm text-slate-700 dark:text-slate-300">{place}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {city.touristAttractions && city.touristAttractions.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Tourist Attractions</h2>
                  <div className="flex flex-wrap gap-2">
                    {city.touristAttractions.map((att, i) => (
                      <Badge key={i} variant="default">{att}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {city.nearbyDestinations && city.nearbyDestinations.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Nearby Destinations</h2>
                  <div className="flex flex-wrap gap-2">
                    {city.nearbyDestinations.map((dest, i) => (
                      <Badge key={i} variant="outline">{dest}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {city.localFoods && city.localFoods.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Local Foods</h2>
                  <div className="flex flex-wrap gap-2">
                    {city.localFoods.map((food, i) => (
                      <Badge key={i} variant="info">{food}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {city.travelInfo && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Travel Information</h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{city.travelInfo}</p>
                </Card>
              </motion.div>
            )}

            {monuments.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Nearby Monuments</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {monuments.map((m) => (
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
            {city.coordinates && (
              <motion.div {...fadeUp}>
                <Card className="p-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Location</h2>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <MapWithNoSSR
                      center={[city.coordinates.lat, city.coordinates.lng]}
                      markers={[{ position: [city.coordinates.lat, city.coordinates.lng], title: city.name }]}
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.div {...fadeUp}>
              <Card className="p-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Quick Info</h2>
                <div className="space-y-3 text-sm">
                  <InfoRow label="Population" value={city.population.toLocaleString('en-IN')} />
                  {city.coordinates && (
                    <InfoRow label="Coordinates" value={`${city.coordinates.lat.toFixed(4)}, ${city.coordinates.lng.toFixed(4)}`} />
                  )}
                  {stateName && <InfoRow label="State" value={stateName} />}
                </div>
              </Card>
            </motion.div>

            <motion.div {...fadeUp}>
              <Card className="p-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Explore</h2>
                <div className="space-y-2">
                  {stateName && (
                    <Link href={`/states/${stateName.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button variant="primary" className="w-full text-sm">View State Page</Button>
                    </Link>
                  )}
                  <Link href={`/explorer`}>
                    <Button variant="secondary" className="w-full text-sm">Explore on Map</Button>
                  </Link>
                  <Button variant="outline" className="w-full text-sm" onClick={() => router.back()}>
                    &larr; Back
                  </Button>
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
