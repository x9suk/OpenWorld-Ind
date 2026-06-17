import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contributing Guide',
  description: 'Learn how to contribute data, photos, and corrections to OpenWorld India.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
