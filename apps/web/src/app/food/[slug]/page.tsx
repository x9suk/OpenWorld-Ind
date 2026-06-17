'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/SafeImage';
import {
  Navbar, Footer, LoadingSpinner, ErrorState, Breadcrumbs,
  Badge, Card, FoodCard,
} from '@openworld/ui';
import { api } from '@/lib/api';
import { getFoodImage } from '@/lib/images';
import type { Food, State } from '@openworld/types';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const spiceColors: Record<string, string> = {
  mild: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hot: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'very-hot': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function FoodDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [food, setFood] = useState<Food | null>(null);
  const [states, setStates] = useState<State[]>([]);
  const [related, setRelated] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFood = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [foodRes, statesRes, foodsRes] = await Promise.all([
        api.foods.get(slug),
        api.states.list(),
        api.foods.list(),
      ]);
      const foodData = foodRes.data || foodRes;
      setFood(foodData);
      setStates(statesRes.data || []);
      const allFoods: Food[] = foodsRes.data || [];
      setRelated(allFoods.filter((f) => f.stateId === foodData.stateId && f.id !== foodData.id).slice(0, 6));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load food');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchFood(); }, [fetchFood]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="page-container">
          <ErrorState message={error} onRetry={fetchFood} />
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || !food) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <LoadingSpinner size="lg" />
        <Footer />
      </div>
    );
  }

  const stateName = states.find((s) => s.id === food.stateId)?.name || 'Unknown';

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <div className="page-container pb-0">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Food', href: '/food' },
            { label: food.name },
          ]}
        />
      </div>

      <section className="relative overflow-hidden">
        <div className="relative h-64 md:h-80">
          <SafeImage src={getFoodImage(food.imageUrl)} alt={food.name} fill fallbackSrc="/images/placeholders/food.svg" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{food.name}</h1>
              <p className="text-lg text-gray-200 mb-3">{stateName}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" size="md">{food.category}</Badge>
                {food.isVegetarian && <Badge variant="success" size="md">Vegetarian</Badge>}
                {!food.isVegetarian && <Badge variant="danger" size="md">Non-Vegetarian</Badge>}
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${spiceColors[food.spiceLevel] || spiceColors.mild}`}>
                  {food.spiceLevel} spice
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {food.description && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Description</h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{food.description}</p>
                </Card>
              </motion.div>
            )}

            {food.history && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">History</h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{food.history}</p>
                </Card>
              </motion.div>
            )}

            {food.ingredients && food.ingredients.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Ingredients</h2>
                  <div className="flex flex-wrap gap-2">
                    {food.ingredients.map((ing, i) => (
                      <Badge key={i} variant="info">{ing}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {food.regionalVariations && food.regionalVariations.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Regional Variations</h2>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                    {food.regionalVariations.map((varia, i) => (
                      <li key={i}>{varia}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}

            {related.length > 0 && (
              <motion.div {...fadeUp}>
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">More Foods from {stateName}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.slice(0, 4).map((f) => (
                      <FoodCard
                        key={f.id}
                        name={f.name}
                        stateName={stateName}
                        category={f.category}
                        isVegetarian={f.isVegetarian}
                        spiceLevel={f.spiceLevel as 'mild' | 'medium' | 'hot' | 'very-hot'}
                        imageUrl={getFoodImage(f.imageUrl)}
                        slug={f.name.toLowerCase().replace(/\s+/g, '-')}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div {...fadeUp}>
              <Card className="p-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Quick Info</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Category</span>
                    <p className="font-medium text-slate-900 dark:text-white">{food.category}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Type</span>
                    <p className="font-medium text-slate-900 dark:text-white">{food.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Spice Level</span>
                    <p className="font-medium text-slate-900 dark:text-white">{food.spiceLevel}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">State</span>
                    <p className="font-medium text-slate-900 dark:text-white">{stateName}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
