'use client';

import { useEffect } from 'react';
import { Navbar, Footer, Button } from '@openworld/ui';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-saffron-500 mb-4">500</h1>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">{error.message || 'An unexpected error occurred.'}</p>
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
