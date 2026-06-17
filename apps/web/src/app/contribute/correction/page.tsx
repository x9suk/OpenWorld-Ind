'use client';

import { useState } from 'react';
import { Navbar, Footer, Card, Button } from '@openworld/ui';
import { motion } from 'framer-motion';

export default function ContributeCorrectionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    placeName: '',
    issueType: 'inaccurate_description',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              Report a Correction
            </h1>
            <p className="text-slate-700 dark:text-slate-300">
              Help us keep OpenWorld India accurate by reporting errors or outdated information.
            </p>
          </motion.div>
        </div>
      </section>
      <div className="page-container py-8">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Correction Reported</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Thank you for helping improve our data. Our team will review your correction shortly.
                </p>
                <Button variant="primary" onClick={() => { setSubmitted(false); setForm({ placeName: '', issueType: 'inaccurate_description', description: '' }); }}>
                  Report Another
                </Button>
              </Card>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="placeName">
                      Place / Page Name *
                    </label>
                    <input
                      id="placeName"
                      name="placeName"
                      value={form.placeName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Taj Mahal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="issueType">
                      Issue Type *
                    </label>
                    <select
                      id="issueType"
                      name="issueType"
                      value={form.issueType}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="inaccurate_description">Inaccurate Description</option>
                      <option value="wrong_coordinates">Wrong Coordinates</option>
                      <option value="outdated_info">Outdated Information</option>
                      <option value="broken_image">Broken Image</option>
                      <option value="typo">Typo / Spelling Error</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="description">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe what needs to be corrected and provide the correct information if possible..."
                    />
                  </div>
                </div>
              </Card>

              <Button type="submit" variant="primary" className="w-full">
                Submit Correction
              </Button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
