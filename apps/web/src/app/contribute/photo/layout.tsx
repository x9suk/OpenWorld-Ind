import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit a Photo',
  description: 'Share your photographs of Indian heritage sites and destinations with OpenWorld India.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
