import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Report a Correction',
  description: 'Help keep OpenWorld India accurate by reporting errors or outdated information.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
