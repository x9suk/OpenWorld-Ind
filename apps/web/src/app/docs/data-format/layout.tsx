import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Format Reference',
  description: 'Reference for the data schema, types, and structure used across the OpenWorld India platform.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
