'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar, Footer, LoadingSpinner, ErrorState, Button, Badge } from '@openworld/ui';
import { api } from '@/lib/api';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  timeLimit: number | null;
  questionCount: number;
  questions: Question[];
}

type Phase = 'start' | 'playing' | 'finished';

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('start');
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchQuiz = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.quiz.get(id);
      setQuiz(res.data || res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quiz');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchQuiz(); }, [fetchQuiz]);

  useEffect(() => {
    if (phase === 'playing' && quiz?.timeLimit) {
      setTimeLeft(quiz.timeLimit * 60);
    }
  }, [phase, quiz?.timeLimit]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setPhase('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timeLeft]);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);
    if (index === quiz?.questions[currentQ].correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (quiz && currentQ < quiz.questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelectedIndex(null);
      setAnswered(false);
    } else {
      setPhase('finished');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

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
          <ErrorState message={error} onRetry={fetchQuiz} />
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || !quiz) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <LoadingSpinner size="lg" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <section className="gradient-india">
        <div className="page-container text-center py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{quiz.title}</h1>
            <p className="text-slate-700 dark:text-slate-200 max-w-xl mx-auto mb-4">{quiz.description}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColor(quiz.difficulty)}`}>
                {quiz.difficulty}
              </span>
              <Badge variant="info">{quiz.questionCount} questions</Badge>
              {quiz.timeLimit && <Badge variant="info">{quiz.timeLimit} min</Badge>}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-container max-w-3xl mx-auto">
        {phase === 'start' && (
          <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-slate-600 dark:text-slate-400 mb-8">You&apos;ll have {quiz.questionCount} questions to answer.{quiz.timeLimit ? ` Time limit: ${quiz.timeLimit} minutes.` : ''} Good luck!</p>
            <Button size="lg" onClick={() => setPhase('playing')}>Start Quiz</Button>
          </motion.div>
        )}

        {phase === 'playing' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400 ml-4 whitespace-nowrap">
                {currentQ + 1}/{quiz.questions.length}
              </span>
              {timeLeft !== null && (
                <span className="text-sm font-mono text-slate-500 dark:text-slate-400 ml-4 whitespace-nowrap">
                  {formatTime(timeLeft)}
                </span>
              )}
            </div>

            <div key={currentQ} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                {currentQ + 1}. {quiz.questions[currentQ].text}
              </h2>
              <div className="space-y-3">
                {quiz.questions[currentQ].options.map((option, i) => {
                  let btnClass = 'w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors ';
                  if (!answered) {
                    btnClass += 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20';
                  } else if (i === quiz.questions[currentQ].correctIndex) {
                    btnClass += 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400';
                  } else if (i === selectedIndex) {
                    btnClass += 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400';
                  } else {
                    btnClass += 'border-slate-200 dark:border-slate-600 text-slate-400 dark:text-slate-500';
                  }
                  return (
                    <button key={i} className={btnClass} onClick={() => handleSelect(i)} disabled={answered}>
                      {option}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <motion.div
                  className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-blue-800 dark:text-blue-200">{quiz.questions[currentQ].explanation}</p>
                </motion.div>
              )}
            </div>

            {answered && (
              <div className="text-center mt-6">
                <Button onClick={handleNext}>
                  {currentQ < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {phase === 'finished' && (
          <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 max-w-md mx-auto">
              <div className="text-5xl mb-4">{score === quiz.questions.length ? '🎉' : score >= quiz.questions.length / 2 ? '👍' : '💪'}</div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Quiz Complete!</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                You got <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span> out of <span className="font-bold">{quiz.questions.length}</span> correct
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => {
                    setPhase('start');
                    setCurrentQ(0);
                    setSelectedIndex(null);
                    setAnswered(false);
                    setScore(0);
                    setTimeLeft(null);
                  }}
                >
                  Retry Quiz
                </Button>
                <Button variant="outline" onClick={() => router.push('/quiz')}>
                  Back to Quizzes
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
