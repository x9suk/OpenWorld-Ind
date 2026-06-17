'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer, Button } from '@openworld/ui';

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

const contributions = [
  { title: 'Suggest Edits', icon: '✏️', description: 'Help us correct and improve existing information about states, monuments, and more' },
  { title: 'Upload Photos', icon: '📷', description: 'Share your travel photos of places, foods, festivals, and landmarks across India' },
  { title: 'Add Information', icon: '📝', description: 'Contribute new data about lesser-known locations, traditions, and historical facts' },
  { title: 'Submit Stories', icon: '📖', description: 'Share personal stories, travelogues, and experiences from your journeys in India' },
];

const guidelines = [
  'All contributions must be factually accurate and verifiable',
  'Respect local cultures, traditions, and sensitivities',
  'Do not upload copyrighted content without permission',
  'Photos should be original or properly attributed',
  'Be respectful and constructive in all communications',
  'Follow the community code of conduct at all times',
];

export default function CommunityPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('Edit');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setType('Edit');
    setMessage('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <section className="gradient-india">
        <div className="page-container text-center py-16">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Community Contributions
          </motion.h1>
          <motion.p
            className="text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Help us build the most comprehensive open-source atlas of India
          </motion.p>
        </div>
      </section>

      <section className="page-container">
        <motion.h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6" {...fadeUp}>
          How to Contribute
        </motion.h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" {...staggerContainer}>
          {contributions.map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 card-hover"
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{c.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{c.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="max-w-2xl mx-auto mb-16" {...fadeUp}>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Submit Your Contribution</h2>
          {submitted ? (
            <motion.div
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-4xl mb-2">✅</div>
              <p className="text-green-800 dark:text-green-200 font-medium">Thank you! Your contribution has been submitted successfully.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contribution Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Edit">Edit</option>
                  <option value="Photo">Photo</option>
                  <option value="Information">Information</option>
                  <option value="Story">Story</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your contribution..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Attach File</label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Click to upload or drag and drop</p>
                  <input type="file" className="hidden" />
                </div>
              </div>
              <Button type="submit" className="w-full">Submit Contribution</Button>
            </form>
          )}
        </motion.div>

        <motion.div {...fadeUp}>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Guidelines</h2>
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <ul className="space-y-3">
              {guidelines.map((g, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-blue-500 font-bold mt-0.5">{i + 1}.</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
