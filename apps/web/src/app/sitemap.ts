import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://openworld-india.dev';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/states`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/monuments`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/cities`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/food`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/festivals`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/history`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/explorer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/quiz`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/travel`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contribute`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contribute/place`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contribute/photo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contribute/correction`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/docs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/docs/contributing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/docs/data-format`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/docs/roadmap`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];
}

