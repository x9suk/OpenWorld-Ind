import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contribute',
  description: 'Help build the most comprehensive open-source guide to Indian heritage, culture, and destinations.',
};

export default function ContributeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
