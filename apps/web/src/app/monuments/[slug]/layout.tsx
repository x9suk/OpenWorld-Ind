import type { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Monument',
  description: 'Explore India\'s architectural marvels and historical monuments.',
};

export default function MonumentLayout({ children }: Props) {
  return <>{children}</>;
}
