'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar, Footer, LoadingSpinner, ErrorState } from '@openworld/ui';
import { api } from '@/lib/api';

const categories = ['All', 'Geography', 'History', 'Culture', 'Food', 'Monuments'];

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

interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  questionCount: number;
  timeLimit: number | null;
  category: string;
}

export default function QuizPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchQuizzes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.quiz.list();
      setQuizzes(res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchQuizzes(); }, [fetchQuizzes]);

  const filtered = activeCategory === 'All'
    ? quizzes
    : quizzes.filter((q) => q.category === activeCategory);

  const difficultyColor = (d: string) => {
    switch (d.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchQuizzes} />
        </div>
        <Footer />
      </div>
    );
  }

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
            Explore India Quiz
          </motion.h1>
          <motion.p
            className="text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Test your knowledge about India&apos;s geography, history, culture, and more
          </motion.p>
        </div>
      </section>

      <section className="page-container">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
            {filtered.map((quiz) => (
              <motion.div
                key={quiz.id}
                variants={fadeUp}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 card-hover cursor-pointer"
                onClick={() => router.push(`/quiz/${quiz.id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{quiz.title}</h3>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{quiz.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>{quiz.questionCount} questions</span>
                  {quiz.timeLimit && <span>{quiz.timeLimit} min</span>}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-slate-500 dark:text-slate-400 py-12">No quizzes found for this category.</p>
        )}
      </section>

      <Footer />
    </div>
  );
}
