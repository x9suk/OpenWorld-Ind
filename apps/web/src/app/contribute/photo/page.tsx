'use client';

import { useState } from 'react';
import { Navbar, Footer, Card, Button } from '@openworld/ui';
import { motion } from 'framer-motion';

export default function ContributePhotoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    placeName: '',
    imageUrl: '',
    caption: '',
    photographerName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
              Submit a Photo
            </h1>
            <p className="text-slate-700 dark:text-slate-300">
              Share your photographs of Indian heritage sites and destinations.
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
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Photo Submitted!</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Thank you for sharing your photograph. It will be reviewed and added to the gallery soon.
                </p>
                <Button variant="primary" onClick={() => { setSubmitted(false); setForm({ placeName: '', imageUrl: '', caption: '', photographerName: '' }); }}>
                  Submit Another
                </Button>
              </Card>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="placeName">
                      Place Name *
                    </label>
                    <input
                      id="placeName"
                      name="placeName"
                      value={form.placeName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Hawa Mahal, Jaipur"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="imageUrl">
                      Photo URL *
                    </label>
                    <input
                      id="imageUrl"
                      name="imageUrl"
                      value={form.imageUrl}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/photo.jpg"
                    />
                    <p className="mt-1 text-xs text-slate-500">Link to your photograph (hosted externally)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="caption">
                      Caption
                    </label>
                    <textarea
                      id="caption"
                      name="caption"
                      value={form.caption}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="A brief description of the photo..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="photographerName">
                      Photographer Name *
                    </label>
                    <input
                      id="photographerName"
                      name="photographerName"
                      value={form.photographerName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name for credit"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  By submitting, you confirm that you own the rights to this photograph and agree to license it under CC-BY-SA.
                </p>
              </Card>

              <Button type="submit" variant="primary" className="w-full">
                Submit Photo
              </Button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
