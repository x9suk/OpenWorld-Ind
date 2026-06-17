import { Navbar, Footer, LoadingSpinner } from '@openworld/ui';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
      <Footer />
    </div>
  );
}
