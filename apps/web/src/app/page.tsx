'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { SafeImage } from '@/components/SafeImage';
import { motion } from 'framer-motion';
import { Navbar, Footer, StateCard, MonumentCard, FoodCard, Card, Button, Badge, SearchBar, LoadingSpinner, ErrorState } from '@openworld/ui';
import { stateSlugs } from '@openworld/shared';
import { api } from '@/lib/api';
import { getStateImage, getMonumentImage, getFoodImage } from '@/lib/images';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import type { State, Monument, Food, HistoricalEvent } from '@openworld/types';

const IndiaMap = dynamic(() => import('@/components/IndiaMap'), { ssr: false });

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

const categories = [
  { title: 'States', description: 'Explore 28 states and 8 UTs', href: '/states', gradient: 'from-saffron-400 to-orange-500', icon: '🏛️' },
  { title: 'Monuments', description: 'Discover architectural marvels', href: '/monuments', gradient: 'from-amber-400 to-yellow-500', icon: '🕌' },
  { title: 'Food', description: 'Savor regional cuisines', href: '/food', gradient: 'from-green-400 to-emerald-500', icon: '🍛' },
  { title: 'Festivals', description: 'Celebrate cultural diversity', href: '/festivals', gradient: 'from-pink-400 to-rose-500', icon: '🎉' },
  { title: 'History', description: 'Journey through time', href: '/history', gradient: 'from-purple-400 to-indigo-500', icon: '📜' },
  { title: 'Quiz', description: 'Test your knowledge', href: '/quiz', gradient: 'from-blue-400 to-cyan-500', icon: '🧠' },
];

export default function HomePage() {
  const router = useRouter();
  const [states, setStates] = useState<State[]>([]);
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [timeline, setTimeline] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statesRes, monumentsRes, foodsRes, timelineRes] = await Promise.all([
        api.states.list(1, 6),
        api.monuments.list(1, 6),
        api.foods.list(1, 6),
        api.history.timeline(),
      ]);
      setStates(statesRes.data || []);
      setMonuments(monumentsRes.data || []);
      setFoods(foodsRes.data || []);
      setTimeline(timelineRes.data?.slice(0, 5) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSearch = useCallback((q: string) => {
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }, [router]);

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

      <section className="relative overflow-hidden gradient-india">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-saffron-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        </div>
        <div className="relative page-container text-center py-20 md:py-32">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            OpenWorld India
          </motion.h1>
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Open-source
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Community-driven
            </span>
          </motion.div>
          <motion.p
            className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-10 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore India Through Maps, Stories, Culture, and History.
          </motion.p>
          <motion.div
            className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex-1">
              <SearchBar
                placeholder="Search states, cities, monuments..."
                onSearch={handleSearch}
                className="shadow-lg"
              />
            </div>
            <a
              href="https://github.com/openworld-india"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg shrink-0"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Star on GitHub
            </a>
          </motion.div>
        </div>
      </section>

      <motion.section className="relative -mt-12 mb-12 z-10" {...fadeUp}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'States', value: 28, suffix: '+', color: 'from-saffron-400 to-orange-500' },
            { label: 'Districts', value: 766, suffix: '+', color: 'from-green-400 to-emerald-500' },
            { label: 'Union Territories', value: 8, suffix: '', color: 'from-blue-400 to-indigo-500' },
            { label: 'Cities', value: 4000, suffix: '+', color: 'from-purple-400 to-pink-500' },
          ].map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white text-center shadow-lg`}>
              <div className="text-3xl md:text-4xl font-bold">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base text-white/80 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="page-container pt-4 pb-6" {...fadeUp}>
        <Card className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/40">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Open-Source India Atlas</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                OpenWorld India is a community-built digital atlas. Every state profile, monument detail, and city guide is contributed by people like you.
                All data is freely available under CC-BY-SA.
              </p>
            </div>
            <a href="/contribute" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shrink-0">
              Start Contributing
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </Card>
      </motion.section>

      <section className="page-container">
        <motion.div {...fadeUp}>
          <h2 className="section-title">Explore India</h2>
          <p className="section-subtitle">Click on a state capital to learn more</p>
        </motion.div>
        <motion.div className="h-[500px] rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700" {...fadeUp}>
          <IndiaMap />
        </motion.div>
      </section>

      <section className="page-container">
        <motion.div {...fadeUp}>
          <h2 className="section-title">Featured States</h2>
          <p className="section-subtitle">Discover the diversity of India&apos;s states</p>
        </motion.div>
        {loading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
            {states.map((state) => (
              <motion.div key={state.id} className="card-hover" variants={fadeUp}>
                <StateCard
                  name={state.name}
                  capital={state.capital}
                  population={(state.population / 10000000).toFixed(1) + ' Cr'}
                  area={state.area.toLocaleString('en-IN') + ' km²'}
                  languageCount={state.languages.length}
                  imageUrl={getStateImage(state.imageUrl)}
                  slug={stateSlugs[state.name] || state.name.toLowerCase().replace(/\s+/g, '-')}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
        <motion.div className="text-center mt-8" {...fadeUp}>
          <Button variant="outline" size="lg" onClick={() => router.push('/states')}>
            View All States
          </Button>
        </motion.div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-800/50">
        <div className="page-container">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Explore by Category</h2>
            <p className="section-subtitle">Dive into every aspect of India</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
            {categories.map((cat) => (
              <motion.a
                key={cat.href}
                href={cat.href}
                variants={fadeUp}
                className="card-hover block"
              >
                <Card className="overflow-hidden">
                  <div className={`bg-gradient-to-br ${cat.gradient} p-6 text-white`}>
                    <span className="text-3xl">{cat.icon}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{cat.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{cat.description}</p>
                  </div>
                </Card>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="page-container">
        <motion.div {...fadeUp}>
          <h2 className="section-title">Featured Monuments</h2>
          <p className="section-subtitle">Architectural wonders across India</p>
        </motion.div>
        {loading ? (
          <LoadingSpinner size="lg" />
        ) : monuments.length > 0 ? (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
            {monuments.map((monument) => (
              <motion.div key={monument.id} className="card-hover" variants={fadeUp}>
                <MonumentCard
                  name={monument.name}
                  stateName={states.find((s) => s.id === monument.stateId)?.name || ''}
                  builtBy={monument.builtBy}
                  builtIn={monument.builtIn}
                  style={monument.style}
                  imageUrl={getMonumentImage(monument.imageUrl)}
                  slug={monument.name.toLowerCase().replace(/\s+/g, '-')}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : null}
        <motion.div className="text-center mt-8" {...fadeUp}>
          <Button variant="outline" size="lg" onClick={() => router.push('/monuments')}>
            View All Monuments
          </Button>
        </motion.div>
      </section>

      <section className="bg-green-50 dark:bg-slate-800/30">
        <div className="page-container">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Popular Foods</h2>
            <p className="section-subtitle">Taste the flavors of India</p>
          </motion.div>
          {loading ? (
            <LoadingSpinner size="lg" />
          ) : foods.length > 0 ? (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
              {foods.map((food) => (
                <motion.div key={food.id} className="card-hover" variants={fadeUp}>
                  <FoodCard
                    name={food.name}
                    stateName={states.find((s) => s.id === food.stateId)?.name || ''}
                    category={food.category}
                    isVegetarian={food.isVegetarian}
                    spiceLevel={food.spiceLevel as 'mild' | 'medium' | 'hot' | 'very-hot'}
                    imageUrl={getFoodImage(food.imageUrl)}
                    slug={food.name.toLowerCase().replace(/\s+/g, '-')}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : null}
          <motion.div className="text-center mt-8" {...fadeUp}>
            <Button variant="outline" size="lg" onClick={() => router.push('/food')}>
              Explore All Foods
            </Button>
          </motion.div>
        </div>
      </section>

      {timeline.length > 0 && (
        <section className="page-container">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Historical Timeline</h2>
            <p className="section-subtitle">Key moments in India&apos;s rich history</p>
          </motion.div>
          <motion.div className="relative max-w-3xl mx-auto" {...fadeUp}>
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-saffron-300 dark:bg-saffron-700" />
            <div className="space-y-8 pl-12">
              {timeline.map((event, i) => (
                <motion.div
                  key={event.id || i}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="absolute -left-10 top-1 w-5 h-5 rounded-full border-2 border-saffron-500 bg-white dark:bg-slate-900" />
                  <Card className="p-5">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <Badge variant="info" size="sm">{event.year}</Badge>
                      {event.period && (
                        <Badge variant="default" size="sm">{event.period}</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{event.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{event.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div className="text-center mt-8" {...fadeUp}>
            <Button variant="outline" size="lg" onClick={() => router.push('/history')}>
              View Full History
            </Button>
          </motion.div>
        </section>
      )}

      <section className="bg-slate-50 dark:bg-slate-800/30">
        <div className="page-container">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Explore the Platform</h2>
            <p className="section-subtitle">See OpenWorld India in action</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto" {...fadeUp}>
            <a href="/explorer" className="group block">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 aspect-video">
                <SafeImage src="/images/screenshots/explorer.png" alt="Explorer Map" fill fallbackSrc="/images/placeholders/state.svg" className="group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white text-sm font-medium">Interactive Explorer Map</p>
                </div>
              </div>
            </a>
            <a href="/states" className="group block">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 aspect-video">
                <SafeImage src="/images/screenshots/state-detail.png" alt="State Detail" fill fallbackSrc="/images/placeholders/state.svg" className="group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white text-sm font-medium">State Detail Pages</p>
                </div>
              </div>
            </a>
            <a href="/monuments" className="group block">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 aspect-video">
                <SafeImage src="/images/screenshots/monument-detail.png" alt="Monument Detail" fill fallbackSrc="/images/placeholders/monument.svg" className="group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white text-sm font-medium">Monument Details</p>
                </div>
              </div>
            </a>
            <a href="/contribute" className="group block">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 aspect-video">
                <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <div className="text-center">
                    <svg className="w-10 h-10 text-blue-500 dark:text-blue-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Contribute Data</p>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-saffron-500 via-white to-green-500 dark:from-saffron-800 dark:via-slate-800 dark:to-green-800">
        <div className="page-container text-center py-16">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Contribute to OpenWorld India
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Help us build the most comprehensive open-source atlas of India. Share your knowledge, photos, and stories.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => router.push('/contribute')}>
                Start Contributing
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.open('https://github.com/openworld-india', '_blank')}>
                View on GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
