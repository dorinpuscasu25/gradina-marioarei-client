import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/seo/metadata';

const paths = ['', '/about', '/accommodation', '/book', '/contact', '/discover', '/experiences'];
const langs = ['ro', 'en', 'ru'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return langs.flatMap((lang) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.8
    }))
  );
}
