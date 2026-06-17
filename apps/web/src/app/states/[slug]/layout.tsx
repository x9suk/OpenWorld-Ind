import { getStateBySlug } from '@openworld/shared';
import type { Metadata } from 'next';
import StateLayoutClient from './StateLayoutClient';

interface Props {
  children: React.ReactNode;
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = getStateBySlug(params.slug) || params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: name,
    description: `Explore ${name} - discover its cities, monuments, culture, foods, and festivals.`,
    openGraph: {
      title: name,
      description: `Explore ${name} - discover its cities, monuments, culture, foods, and festivals.`,
    },
  };
}

export default function StateLayout({ children, params }: Props) {
  return <StateLayoutClient slug={params.slug}>{children}</StateLayoutClient>;
}
