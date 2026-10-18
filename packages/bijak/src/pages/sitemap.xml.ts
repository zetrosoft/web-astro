import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() ?? 'https://bijaktechnology.com').replace(/\/$/, '');
  const posts = await getCollection('blog');
  const postsEn = await getCollection('blog_en');
  const enMap = new Map(postsEn.map(p => [p.id, p]));
  const allIds = new Set([...posts.map(p => p.id), ...postsEn.map(p => p.id)]);

  const pages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/en', priority: '0.9', changefreq: 'daily' },
    { path: '/en/blog', priority: '0.8', changefreq: 'daily' },
    { path: '/project', priority: '0.7', changefreq: 'weekly' },
    { path: '/about', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
  ];

  const staticUrls = pages.map((p) =>
    `  <url><loc>${base}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`);

  const postUrls = Array.from(allIds)
    .filter(id => id !== 'agentic-ai-adaptation-cheap-lightweight-efficient-systems')
    .map(id => {
      const p = posts.find(post => post.id === id) || enMap.get(id)!;
      return [
        `  <url><loc>${base}/blog/${id}</loc><lastmod>${p.data.pubDate.toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
        `  <url><loc>${base}/en/blog/${id}</loc><lastmod>${p.data.pubDate.toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
      ];
    })
    .flat();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].join('\n')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
