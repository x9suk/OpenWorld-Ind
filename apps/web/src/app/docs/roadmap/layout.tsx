import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'See what features and improvements are planned for upcoming releases of OpenWorld India.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
