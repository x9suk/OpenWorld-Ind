import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-saffron-500">404</h1>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mt-4">Page Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md">The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="inline-block mt-8 px-8 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">Go Home</Link>
      </div>
    </div>
  );
}
