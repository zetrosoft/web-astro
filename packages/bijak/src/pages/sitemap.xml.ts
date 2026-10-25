import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() ?? 'https://bijaktechnology.com').replace(/\/$/, '');
  const posts = await getCollection('blog');
  const postsEn = await getCollection('blog_en');
  const enMap = new Map(postsEn.map(p => [p.id, p]));
  const idMap = new Map(posts.map(p => [p.id, p]));
  const allIds = new Set([...posts.map(p => p.id), ...postsEn.map(p => p.id)]);

  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily', enPath: '/en/' },
    { path: '/blog/', priority: '0.9', changefreq: 'daily', enPath: '/en/blog/' },
    { path: '/en/', priority: '0.9', changefreq: 'daily', idPath: '/' },
    { path: '/en/blog/', priority: '0.8', changefreq: 'daily', idPath: '/blog/' },
    { path: '/project/', priority: '0.7', changefreq: 'weekly', enPath: '/project/' },
    { path: '/about/', priority: '0.6', changefreq: 'monthly', enPath: '/about/' },
    { path: '/contact/', priority: '0.6', changefreq: 'monthly', enPath: '/contact/' },
    { path: '/privacy-policy/', priority: '0.4', changefreq: 'yearly', enPath: '/privacy-policy/' },
    { path: '/terms/', priority: '0.4', changefreq: 'yearly', enPath: '/terms/' },
  ];

  const staticUrls = staticPages.map((p) => {
    return `  <url>
    <loc>${base}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
  });

  const postUrls = Array.from(allIds)
    .filter(id => id !== 'agentic-ai-adaptation-cheap-lightweight-efficient-systems')
    .map(id => {
      const pId = idMap.get(id);
      const pEn = enMap.get(id);
      const post = pId || pEn;
      if (!post) return [];

      const lastmod = post.data.pubDate ? new Date(post.data.pubDate).toISOString() : new Date().toISOString();
      const idUrl = `${base}/blog/${id}/`;
      const enUrl = `${base}/en/blog/${id}/`;

      const entries: string[] = [];

      // Entry untuk versi Bahasa Indonesia
      if (pId) {
        entries.push(`  <url>
    <loc>${idUrl}</loc>
    <xhtml:link rel="alternate" hreflang="id" href="${idUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${idUrl}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
      }

      // Entry untuk versi Bahasa Inggris
      if (pEn || pId) {
        entries.push(`  <url>
    <loc>${enUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="id" href="${idUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${idUrl}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
      }

      return entries;
    })
    .flat();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticUrls, ...postUrls].join('\n')}
</urlset>`;

  return new Response(xml, { 
    headers: { 
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff'
    } 
  });
};
