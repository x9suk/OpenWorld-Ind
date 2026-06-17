import clsx from 'clsx';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  period?: string;
  color?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  period?: string;
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={clsx('relative', className)}>
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform md:-translate-x-px" />
      <div className="space-y-8">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={index} className={clsx('relative flex items-start', isLeft ? 'md:flex-row' : 'md:flex-row-reverse')}>
              <div className="hidden md:flex md:w-1/2" />
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 border-blue-500 bg-white dark:bg-gray-800 transform -translate-x-1/2 mt-1.5 z-10" style={event.color ? { borderColor: event.color } : undefined} />
              <div className={clsx('ml-10 md:ml-0 md:w-1/2', isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8')}>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{event.year}</span>
                    {event.period && <span className="text-xs text-gray-500 dark:text-gray-400">{event.period}</span>}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
