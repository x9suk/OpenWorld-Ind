import type { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'City',
  description: 'Discover India\'s vibrant cities, their culture, attractions, and local experiences.',
};

export default function CityLayout({ children }: Props) {
  return <>{children}</>;
}
