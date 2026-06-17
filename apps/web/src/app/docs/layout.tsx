import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Learn how to contribute data, photos, and corrections to OpenWorld India.',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
