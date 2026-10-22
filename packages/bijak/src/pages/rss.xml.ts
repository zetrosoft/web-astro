import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function escapeXml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() ?? 'https://bijaktechnology.com').replace(/\/$/, '');
  const posts = await getCollection('blog');
  const sortedPosts = posts
    .filter(p => p.id !== 'agentic-ai-adaptation-cheap-lightweight-efficient-systems')
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 50);

  const lastBuildDate = sortedPosts[0]?.data.pubDate
    ? new Date(sortedPosts[0].data.pubDate).toUTCString()
    : new Date().toUTCString();

  const itemsXml = sortedPosts
    .map(post => {
      const url = `${base}/blog/${post.id}/`;
      const pubDate = new Date(post.data.pubDate).toUTCString();
      const categories = [post.data.category, ...(post.data.tags || [])]
        .filter(Boolean)
        .map(c => `      <category>${escapeXml(String(c))}</category>`)
        .join('\n');

      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(post.data.author || 'zetrosoft')}</dc:creator>
      <description>${escapeXml(post.data.description)}</description>
${categories}
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Bijak Technology — Jurnal Enterprise ERP, Cloud VPS &amp; Bisnis Ritel</title>
    <link>${base}/</link>
    <description>Jurnal independen arsitektur teknologi, ERPNext v16 Enterprise, Cloud KVM VPS, Avalanche Web3, dan operasional ritel UMKM Indonesia.</description>
    <language>id-ID</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
