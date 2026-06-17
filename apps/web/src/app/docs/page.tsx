'use client';

import { Navbar, Footer, Card } from '@openworld/ui';
import Link from 'next/link';
import { motion } from 'framer-motion';

const sections = [
  {
    title: 'Contributing Guide',
    description: 'Learn how to contribute data, photos, and corrections to OpenWorld India.',
    href: '/docs/contributing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    title: 'Data Format',
    description: 'Reference for the data schema, types, and structure used across the platform.',
    href: '/docs/data-format',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
  },
  {
    title: 'Roadmap',
    description: 'See what features and improvements are planned for upcoming releases.',
    href: '/docs/roadmap',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
];

export default function DocsHubPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <section className="relative overflow-hidden gradient-india py-16">
        <div className="page-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
              Documentation
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
              Everything you need to know about contributing to and using OpenWorld India.
            </p>
          </motion.div>
        </div>
      </section>
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {sections.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={s.href}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{s.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{s.description}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
