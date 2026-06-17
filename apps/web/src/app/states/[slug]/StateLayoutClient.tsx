'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar, Footer, Breadcrumbs } from '@openworld/ui';
import { getStateBySlug } from '@openworld/shared';
import { api } from '@/lib/api';

const subPages = [
  { label: 'Overview', path: '' },
  { label: 'Cities', path: '/cities' },
  { label: 'Monuments', path: '/monuments' },
  { label: 'Foods', path: '/foods' },
  { label: 'Festivals', path: '/festivals' },
];

export default function StateLayoutClient({ children, slug }: { children: React.ReactNode; slug: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [stateName, setStateName] = useState('');

  const fetchState = useCallback(async () => {
    try {
      const res = await api.states.get(slug);
      const data = res.data || res;
      setStateName(data.name);
    } catch {
      const fallback = getStateBySlug(slug) || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      setStateName(fallback);
    }
  }, [slug]);

  useEffect(() => { fetchState(); }, [fetchState]);

  const basePath = `/states/${slug}`;
  const activeSub = subPages.find((p) => {
    const full = basePath + p.path;
    if (p.path === '') return pathname === basePath;
    return pathname.startsWith(full);
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <div className="page-container pb-0">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'States', href: '/states' },
            { label: stateName || slug },
          ]}
        />
        <div className="flex items-center justify-between gap-4 mb-4 mt-4">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {stateName || 'Loading...'}
          </h1>
          <Link
            href={`/states/${slug}`}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            &larr; Back to State
          </Link>
        </div>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
          <nav className="hidden md:flex gap-6 -mb-px">
            {subPages.map((p) => {
              const href = basePath + p.path;
              const isActive = activeSub?.label === p.label;
              return (
                <Link
                  key={p.label}
                  href={href}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {p.label}
                </Link>
              );
            })}
          </nav>
          <div className="md:hidden py-3">
            <select
              value={basePath + (activeSub?.path || '')}
              onChange={(e) => router.push(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            >
              {subPages.map((p) => (
                <option key={p.label} value={basePath + p.path}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}
