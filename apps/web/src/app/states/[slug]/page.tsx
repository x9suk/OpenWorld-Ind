'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/SafeImage';
import {
  Navbar, Footer, LoadingSpinner, ErrorState, Breadcrumbs,
  StatCard, Badge, Button, CityCard, MonumentCard, FoodCard, FestivalCard, Card,
} from '@openworld/ui';
import { getStateBySlug } from '@openworld/shared';
import { api } from '@/lib/api';
import { getStateImage, getCityImage, getMonumentImage, getFoodImage, getFestivalImage } from '@/lib/images';
import type { State, City, Monument, Food, Festival } from '@openworld/types';

const tabs = ['Overview', 'Cities', 'Monuments', 'Foods', 'Festivals'] as const;

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

export default function StateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [state, setState] = useState<State | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Overview');
  const [galleryIndex, setGalleryIndex] = useState(0);

  const stateName = getStateBySlug(slug) || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [stateRes] = await Promise.all([api.states.get(slug)]);
      setState(stateRes.data || stateRes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load state');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const fetchTabData = useCallback(async (tab: string) => {
    try {
      if (tab === 'Cities') {
        const res = await api.states.cities(slug);
        setCities(res.data || []);
      } else if (tab === 'Monuments') {
        const res = await api.states.monuments(slug);
        setMonuments(res.data || []);
      } else if (tab === 'Foods') {
        const res = await api.states.foods(slug);
        setFoods(res.data || []);
      } else if (tab === 'Festivals') {
        const res = await api.states.festivals(slug);
        setFestivals(res.data || []);
      }
    } catch {
      // silent
    }
  }, [slug]);

  useEffect(() => { fetchAll(); }, [fetchAll]);
  useEffect(() => {
    if (!loading && activeTab !== 'Overview') fetchTabData(activeTab);
  }, [activeTab, loading, fetchTabData]);

  const galleryImages = useMemo(() => {
    const imgs = state?.imageUrl ? [state.imageUrl] : [];
    return imgs;
  }, [state]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchAll} />
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || !state) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <LoadingSpinner size="lg" />
        <Footer />
      </div>
    );
  }

  const languages = Array.isArray(state.languages) ? state.languages.join(', ') : state.languages || 'N/A';

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="relative overflow-hidden">
        <div className="relative h-72 md:h-[420px]">
          <SafeImage src={getStateImage(state.imageUrl)} alt={state.name} fill fallbackSrc="/images/placeholders/state.svg" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="info" size="md">
                  {state.formationDate ? `Formed ${state.formationDate}` : 'State'}
                </Badge>
                <ShareButton title={state.name} />
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 drop-shadow-lg">
                {state.name}
              </h1>
              <p className="text-xl text-gray-200 drop-shadow">{state.capital} &middot; India</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="page-container pb-0">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'States', href: '/states' },
            { label: state.name },
          ]}
        />
      </div>

      <section className="page-container">
        <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8" {...fadeUp}>
          <StatCard label="Capital" value={state.capital} />
          <StatCard label="Population" value={`${(state.population / 10000000).toFixed(1)} Cr`} />
          <StatCard label="Area" value={`${state.area.toLocaleString('en-IN')} km²`} />
          <StatCard label="Districts" value={String(state.districtsCount)} />
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
        {activeTab === 'Overview' && (
          <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {state.cultureDescription && (
                  <motion.div {...fadeUp}>
                    <Card className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Culture</h2>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{state.cultureDescription}</p>
                    </Card>
                  </motion.div>
                )}
                {state.economyOverview && (
                  <motion.div {...fadeUp}>
                    <Card className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Economy</h2>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{state.economyOverview}</p>
                    </Card>
                  </motion.div>
                )}
                {state.touristAttractions && state.touristAttractions.length > 0 && (
                  <motion.div {...fadeUp}>
                    <Card className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Top Tourist Attractions</h2>
                      <div className="flex flex-wrap gap-2">
                        {state.touristAttractions.map((att) => (
                          <Badge key={att} variant="default">{att}</Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
                {state.majorCities && state.majorCities.length > 0 && (
                  <motion.div {...fadeUp}>
                    <Card className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Major Cities</h2>
                      <div className="flex flex-wrap gap-2">
                        {state.majorCities.map((city) => (
                          <Badge key={city} variant="info">{city}</Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                <motion.div {...fadeUp}>
                  <Card className="p-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Quick Facts</h2>
                    <div className="space-y-3 text-sm">
                      <FactRow label="Capital" value={state.capital} />
                      <FactRow label="Languages" value={languages} />
                      <FactRow label="Formation" value={state.formationDate} />
                      <FactRow label="Statehood" value={state.statehoodDay} />
                      {state.website && (
                        <FactRow label="Website" value={
                          <a href={state.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            {state.website.replace(/https?:\/\//, '')}
                          </a>
                        } />
                      )}
                    </div>
                  </Card>
                </motion.div>

                <motion.div {...fadeUp}>
                  <Card className="p-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Visit Nearby</h2>
                    <div className="space-y-2">
                      <Link href={`/explorer?state=${slug}`}>
                        <Button variant="primary" className="w-full text-sm">Explore on Map</Button>
                      </Link>
                      <Link href={`/travel`}>
                        <Button variant="secondary" className="w-full text-sm">View Travel Plans</Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>

            {galleryImages.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Gallery</h2>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <SafeImage src={galleryImages[galleryIndex]} alt={state.name} fill fallbackSrc="/images/placeholders/state.svg" />
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
                  </div>
                </Card>
              </motion.div>
            )}

            {state.festivals && state.festivals.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Famous Festivals</h2>
                  <div className="flex flex-wrap gap-2">
                    {state.festivals.map((fes) => (
                      <Badge key={fes} variant="outline">{fes}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {state.famousFoods && state.famousFoods.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Famous Foods</h2>
                  <div className="flex flex-wrap gap-2">
                    {state.famousFoods.map((food) => (
                      <Badge key={food} variant="default">{food}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'Cities' && (
          <TabContent loading={false} data={cities} render={(city: City) => (
            <CityCard
              name={city.name}
              stateName={state.name}
              population={city.population.toLocaleString('en-IN')}
              famousPlaces={city.famousPlaces || []}
              imageUrl={getCityImage(city.imageUrl)}
              slug={city.name.toLowerCase().replace(/\s+/g, '-')}
            />
          )} />
        )}

        {activeTab === 'Monuments' && (
          <TabContent loading={false} data={monuments} render={(m: Monument) => (
            <MonumentCard
              name={m.name}
              stateName={state.name}
              builtBy={m.builtBy}
              builtIn={m.builtIn}
              style={m.style}
              imageUrl={getMonumentImage(m.imageUrl)}
              slug={m.name.toLowerCase().replace(/\s+/g, '-')}
            />
          )} />
        )}

        {activeTab === 'Foods' && (
          <TabContent loading={false} data={foods} render={(f: Food) => (
            <FoodCard
              name={f.name}
              stateName={state.name}
              category={f.category}
              isVegetarian={f.isVegetarian}
              spiceLevel={f.spiceLevel as 'mild' | 'medium' | 'hot' | 'very-hot'}
              imageUrl={getFoodImage(f.imageUrl)}
              slug={f.name.toLowerCase().replace(/\s+/g, '-')}
            />
          )} />
        )}

        {activeTab === 'Festivals' && (
          <TabContent loading={false} data={festivals} render={(fe: Festival) => (
            <FestivalCard
              name={fe.name}
              stateName={state.name}
              month={fe.month}
              type={fe.type}
              imageUrl={getFestivalImage(fe.imageUrl)}
              slug={fe.name.toLowerCase().replace(/\s+/g, '-')}
            />
          )} />
        )}
      </section>
    </div>
  );
}

function FactRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <span className="text-slate-500 dark:text-slate-400 text-xs">{label}</span>
      <span className="font-medium text-slate-900 dark:text-white text-xs text-right">{value}</span>
    </div>
  );
}

function TabContent<T>({ loading, data, render }: { loading: boolean; data: T[]; render: (item: T) => React.ReactNode }) {
  if (loading) return <LoadingSpinner size="md" />;
  if (data.length === 0) return <p className="text-center text-slate-500 dark:text-slate-400 py-12">No data available.</p>;
  return (
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
      {data.map((item, i) => (
        <motion.div key={i} variants={fadeUp}>
          {render(item)}
        </motion.div>
      ))}
    </motion.div>
  );
}
