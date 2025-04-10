import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/*', '/adminlogin'],
    },
    sitemap: 'https://www.cozzycorner.in/sitemap.xml',
  };
}
