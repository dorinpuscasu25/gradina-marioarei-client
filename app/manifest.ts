import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from '@/src/seo/metadata';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Pensiunea GM',
    description: SITE_DESCRIPTION,
    start_url: '/ro',
    display: 'standalone',
    background_color: '#FAF7F2',
    theme_color: '#2D4A3E',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  };
}
