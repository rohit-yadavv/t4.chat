import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/private/*', '/admin/*'],
    },
    sitemap: 'https://t4-chat.vercel.app/sitemap.xml',
  };
} 