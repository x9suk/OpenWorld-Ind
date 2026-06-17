import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About OpenWorld India',
};

const features = [
  { title: 'Interactive Map', icon: '🗺️', description: 'Explore India with an interactive map highlighting states and cities' },
  { title: 'State Explorer', icon: '🏛️', description: 'Deep dive into each state\'s culture, economy, and attractions' },
  { title: 'Monument Guide', icon: '🕌', description: 'Discover India\'s architectural marvels and heritage sites' },
  { title: 'Food Atlas', icon: '🍛', description: 'Savor the diverse regional cuisines of India' },
  { title: 'Festival Calendar', icon: '🎉', description: 'Celebrate India\'s vibrant festivals across the year' },
  { title: 'History Timeline', icon: '📜', description: 'Journey through India\'s rich historical timeline' },
  { title: 'Quiz Platform', icon: '🧠', description: 'Test your knowledge with curated quizzes about India' },
  { title: 'Travel Planner', icon: '✈️', description: 'Plan your perfect India trip with day-by-day itineraries' },
];

const techStack = ['Next.js', 'TypeScript', 'Tailwind', 'Express', 'SQLite', 'Leaflet', 'Framer Motion'];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="bg-gradient-to-br from-saffron-500 via-orange-400 to-saffron-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">About OpenWorld India</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            India&apos;s most comprehensive open-source digital atlas and cultural encyclopedia
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            OpenWorld India aims to create the most comprehensive, open-source digital atlas of India — bringing together maps, stories, culture, and history in one accessible platform. We believe that exploring India&apos;s incredible diversity should be free and available to everyone.
          </p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A world where every person can explore, learn about, and contribute to the collective knowledge of India&apos;s geography, heritage, and culture. We envision OpenWorld India as the go-to resource for students, travelers, researchers, and anyone curious about India.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center card-hover">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">Technology Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Open Source</h2>
          <p className="text-slate-700 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            OpenWorld India is completely open source. Contribute, fork, or report issues on GitHub.
          </p>
          <a
            href="https://github.com/openworld-india"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">License</h2>
        <p className="text-slate-700 dark:text-slate-300">
          This project is licensed under the MIT License — see the LICENSE file for details.
        </p>
      </section>
    </div>
  );
}
