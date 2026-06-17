'use client';

import { Navbar, Footer, Card, Button } from '@openworld/ui';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ways = [
  {
    title: 'Add a Place',
    description: 'Submit a new monument, city, or state to the database with details, images, and coordinates.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    href: '/contribute/place',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    title: 'Submit a Photo',
    description: 'Share your photographs of Indian heritage sites, cities, and landscapes.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    href: '/contribute/photo',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    title: 'Report a Correction',
    description: 'Help us keep data accurate by reporting errors in descriptions, facts, or coordinates.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    href: '/contribute/correction',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
];

export default function ContributeHubPage() {
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
              Contribute to OpenWorld India
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
              Help us build the most comprehensive open-source guide to India&apos;s heritage, culture, and destinations.
            </p>
          </motion.div>
        </div>
      </section>
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {ways.map((way, i) => (
            <motion.div
              key={way.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={way.href}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className={`w-14 h-14 rounded-xl ${way.bg} ${way.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {way.icon}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{way.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{way.description}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-16 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Why Contribute?</h2>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">&#9679;</span>
              <span>Your submissions help millions of travelers discover India&apos;s heritage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">&#9679;</span>
              <span>All contributions are reviewed by our community before publication</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">&#9679;</span>
              <span>Contributors are credited on the platform and in our open-source repository</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">&#9679;</span>
              <span>Every addition is licensed under CC-BY-SA, ensuring free access for everyone</span>
            </li>
          </ul>
        </motion.div>
        <div className="text-center mt-8">
          <Link href="/docs/contributing">
            <Button variant="outline">Read Contributing Guide</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
