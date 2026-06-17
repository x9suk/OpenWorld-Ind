'use client';

import { Navbar, Footer, Card } from '@openworld/ui';
import { motion } from 'framer-motion';

export default function ContributingGuidePage() {
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
              Contributing Guide
            </h1>
            <p className="text-slate-700 dark:text-slate-300">
              How to contribute to OpenWorld India and make an impact.
            </p>
          </motion.div>
        </div>
      </section>
      <div className="page-container py-8">
        <div className="max-w-3xl mx-auto prose-headings:text-slate-900 prose-headings:dark:text-white prose-p:text-slate-700 prose-p:dark:text-slate-300 space-y-8">
          <motion.div {...{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }}>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Getting Started</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                OpenWorld India is an open-source project that aims to build a comprehensive guide to India&apos;s heritage,
                culture, and destinations. Anyone can contribute — no technical expertise required.
              </p>
            </Card>
          </motion.div>

          <motion.div {...{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }}>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Ways to Contribute</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">&#9312; Add Places</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">
                    Submit new monuments, cities, or states through our <a href="/contribute/place" className="text-blue-600 dark:text-blue-400 underline">contribution form</a>.
                    Include descriptions, coordinates, images, and historical context.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">&#9313; Submit Photos</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">
                    Share your photographs via the <a href="/contribute/photo" className="text-blue-600 dark:text-blue-400 underline">photo submission form</a>.
                    All photos must be your own work and licensed under CC-BY-SA.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">&#9314; Report Corrections</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">
                    Found an error? Use the <a href="/contribute/correction" className="text-blue-600 dark:text-blue-400 underline">correction form</a> to report inaccuracies.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">&#9315; Code Contributions</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">
                    Developers can contribute via our GitHub repository. We welcome bug fixes, new features,
                    and improvements to the codebase.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div {...{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }}>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Review Process</h2>
              <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
                <li>Your submission is received and logged in our system.</li>
                <li>A community reviewer evaluates the submission for accuracy and completeness.</li>
                <li>If approved, the contribution is published and you are credited.</li>
                <li>If changes are needed, the reviewer may contact you for clarification.</li>
              </ol>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                Typical review time is 1-3 business days.
              </p>
            </Card>
          </motion.div>

          <motion.div {...{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }}>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Licensing</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                All contributions to OpenWorld India are licensed under{' '}
                <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
                  Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA 4.0)
                </a>.
                This ensures that the data remains freely accessible and reusable by everyone.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
