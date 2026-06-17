import clsx from 'clsx';
import { Card } from './Card';
import { Badge } from './Badge';

interface QuizCardProps {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  questionCount: number;
  timeLimit: number;
  slug: string;
  className?: string;
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export function QuizCard({ title, description, difficulty, category, questionCount, timeLimit, slug, className }: QuizCardProps) {
  return (
    <a href={`/quiz/${slug}`} className={clsx('block', className)}>
      <Card hoverable className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <span className={clsx('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', difficultyColors[difficulty])}>
            {difficulty}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info" size="sm">{category}</Badge>
          <Badge variant="default" size="sm">{questionCount} questions</Badge>
          <Badge variant="default" size="sm">{timeLimit} min</Badge>
        </div>
      </Card>
    </a>
  );
}
