import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add a Place',
  description: 'Submit a new monument, city, or state to the OpenWorld India database.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
