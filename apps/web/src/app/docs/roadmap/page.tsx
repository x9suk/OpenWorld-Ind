'use client';

import { Navbar, Footer, Card, Badge } from '@openworld/ui';
import { motion } from 'framer-motion';

const releases = [
  {
    version: 'v1.3',
    title: 'Search & Discovery',
    status: 'upcoming' as const,
    items: [
      'Full-text search across states, cities, and monuments',
      'Advanced filtering by state, type, period, and style',
      'Tag-based content discovery',
      'Related content recommendations',
    ],
  },
  {
    version: 'v1.4',
    title: 'User Accounts & Favorites',
    status: 'planned' as const,
    items: [
      'User registration and profiles',
      'Save favorites and build itineraries',
      'Track contribution history',
      'Personalized content recommendations',
    ],
  },
  {
    version: 'v2.0',
    title: 'Trip Planning',
    status: 'planned' as const,
    items: [
      'Multi-day itinerary builder',
      'Distance and travel time calculations',
      'Print-friendly trip summaries',
      'Export to PDF and Google Maps',
    ],
  },
  {
    version: 'v2.1',
    title: 'Community Features',
    status: 'planned' as const,
    items: [
      'User reviews and ratings',
      'Photo galleries with community uploads',
      'Discussion forums',
      'Q&A section for each destination',
    ],
  },
  {
    version: 'v2.2',
    title: 'Mobile App',
    status: 'planned' as const,
    items: [
      'React Native mobile application',
      'Offline access to saved destinations',
      'Push notifications for travel tips',
      'Location-aware discovery',
    ],
  },
  {
    version: 'v2.3',
    title: 'Internationalization',
    status: 'planned' as const,
    items: [
      'Hindi and other Indian language support',
      'Multiple language translations',
      'Localized content for regional audiences',
      'Right-to-left layout support',
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <section className="relative overflow-hidden gradient-india py-12">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
              Roadmap
            </h1>
            <p className="text-slate-700 dark:text-slate-300">
              Planned features and improvements for OpenWorld India.
            </p>
          </motion.div>
        </div>
      </section>
      <div className="page-container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-8">
              {releases.map((release, i) => (
                <motion.div
                  key={release.version}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-2.5 top-2 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500 dark:border-blue-400 z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                  </div>
                  <Card className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        variant={
                          release.status === 'upcoming'
                            ? 'info'
                            : release.status === 'planned'
                            ? 'default'
                            : 'success'
                        }
                      >
                        {release.version}
                      </Badge>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        {release.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{release.title}</h3>
                    <ul className="space-y-1.5">
                      {release.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <span className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0">&#9679;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
