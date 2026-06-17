'use client';

import { useState } from 'react';
import { Navbar, Footer, Card, Button } from '@openworld/ui';
import { motion } from 'framer-motion';

export default function ContributePlacePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: 'monument',
    stateName: '',
    description: '',
    coordinates: '',
    imageUrl: '',
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
              Add a Place
            </h1>
            <p className="text-slate-700 dark:text-slate-300">
              Submit a new monument, city, or state to the OpenWorld India database.
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
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank You!</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Your place submission has been received. Our team will review it and publish it soon.
                </p>
                <Button variant="primary" onClick={() => { setSubmitted(false); setForm({ name: '', type: 'monument', stateName: '', description: '', coordinates: '', imageUrl: '' }); }}>
                  Submit Another
                </Button>
              </Card>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="name">
                      Place Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Qutub Minar"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="type">
                      Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="monument">Monument</option>
                      <option value="city">City</option>
                      <option value="state">State</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="stateName">
                      State / Territory *
                    </label>
                    <input
                      id="stateName"
                      name="stateName"
                      value={form.stateName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Delhi"
                    />
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
                      placeholder="Provide a detailed description of the place..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="coordinates">
                      Coordinates (optional)
                    </label>
                    <input
                      id="coordinates"
                      name="coordinates"
                      value={form.coordinates}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 28.5245, 77.1855"
                    />
                    <p className="mt-1 text-xs text-slate-500">Latitude and longitude separated by comma</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="imageUrl">
                      Image URL (optional)
                    </label>
                    <input
                      id="imageUrl"
                      name="imageUrl"
                      value={form.imageUrl}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  By submitting, you agree that your contribution will be licensed under CC-BY-SA and will be publicly visible after review.
                </p>
              </Card>

              <div className="flex gap-3">
                <Button type="submit" variant="primary" className="flex-1">
                  Submit Place
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
