'use client';

import { Suspense, useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/SafeImage';
import { Navbar, Footer, Card, Badge, SearchBar, LoadingSpinner, ErrorState, EmptyState } from '@openworld/ui';
import { CATEGORIES } from '@openworld/shared';
import { api } from '@/lib/api';
import { getImageSrc } from '@/lib/images';
import type { SearchResult } from '@openworld/types';

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

const popularSuggestions = ['Taj Mahal', 'Delhi', 'Biryani', 'Diwali', 'Kerala', 'Hampi', 'Golden Temple'];

const typeLabels: Record<string, string> = {
  state: 'States',
  city: 'Cities',
  monument: 'Monuments',
  food: 'Foods',
  festival: 'Festivals',
  historical_event: 'Historical Events',
};

const typeIcons: Record<string, string> = {
  state: '🏛️',
  city: '🏙️',
  monument: '🕌',
  food: '🍛',
  festival: '🎉',
  historical_event: '📜',
};

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(query);

  const fetchResults = useCallback(async (q: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.search(q);
      setResults(res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setSearchInput(query);
      fetchResults(query);
    }
  }, [query, fetchResults]);

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    results.forEach((r) => {
      if (!groups[r.type]) groups[r.type] = [];
      groups[r.type].push(r);
    });
    return groups;
  }, [results]);

  const handleSearch = useCallback((q: string) => {
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }, [router]);

  const handleChipClick = useCallback((suggestion: string) => {
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  }, [router]);

  const visibleTypes = Object.keys(typeLabels).filter((t) => (groupedResults[t]?.length || 0) > 0);

  if (!query.trim()) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <section className="gradient-india">
          <div className="page-container text-center py-16">
            <motion.h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              Search India
            </motion.h1>
            <motion.p className="text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              What are you looking for in India?
            </motion.p>
            <motion.div className="max-w-xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <SearchBar placeholder="Search states, cities, monuments..." value={searchInput} onChange={setSearchInput} onSearch={handleSearch} className="shadow-lg" />
            </motion.div>
          </div>
        </section>
        <section className="page-container">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Popular Searches</h2>
            <p className="section-subtitle">Try searching for something below</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {popularSuggestions.map((s) => (
                <button key={s} onClick={() => handleChipClick(s)} className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <section className="gradient-india">
        <div className="page-container text-center py-12">
          <motion.div className="max-w-xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SearchBar placeholder="Refine your search..." value={searchInput} onChange={setSearchInput} onSearch={handleSearch} loading={loading} className="shadow-lg" />
          </motion.div>
        </div>
      </section>
      <section className="page-container">
        {error ? (
          <ErrorState message={error} onRetry={() => fetchResults(query)} />
        ) : loading ? (
          <LoadingSpinner size="lg" />
        ) : results.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <EmptyState
              title="No results found"
              description={`We couldn't find anything for "${query}". Try a different search term.`}
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Try searching for:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {popularSuggestions.map((s) => (
                  <button key={s} onClick={() => handleChipClick(s)} className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs font-medium">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-10">
            <motion.p className="text-sm text-slate-500 dark:text-slate-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Found {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</motion.p>
            {visibleTypes.map((type) => (
              <motion.div key={type} {...fadeUp}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{typeIcons[type]}</span>
                    {typeLabels[type]}
                    <span className="text-sm font-normal text-slate-400 dark:text-slate-500">({groupedResults[type].length})</span>
                  </h2>
                  <Link href={`/${type === 'historical_event' ? 'history' : type === 'food' ? 'food' : type + 's'}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    See all
                  </Link>
                </div>
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" {...staggerContainer}>
                  {groupedResults[type].map((result) => (
                    <motion.div key={result.id} variants={fadeUp}>
                      <Link href={result.url || `/${type === 'historical_event' ? 'history' : type === 'food' ? 'food' : type + 's'}/${result.id}`} className="block">
                        <Card hoverable className="overflow-hidden">
                          {result.imageUrl && (
                            <div className="relative h-36">
                              <SafeImage src={getImageSrc(result.imageUrl, '/images/placeholders/state.svg')} alt={result.title} fill fallbackSrc="/images/placeholders/state.svg" />
                            </div>
                          )}
                          <div className="p-4">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{result.title}</h3>
                            {result.description && <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{result.description}</p>}
                            <div className="mt-2">
                              <Badge variant="info" size="sm">{typeLabels[type]}</Badge>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <LoadingSpinner size="lg" />
        <Footer />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
