'use client';

export function ExplorerSkeleton() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="lg:hidden flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden lg:block w-72 lg:w-80 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 space-y-5">
          <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
              <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
              <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    </div>
  );
}
