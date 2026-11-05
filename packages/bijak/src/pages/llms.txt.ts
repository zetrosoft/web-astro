import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() ?? 'https://bijaktechnology.com').replace(/\/$/, '');
  const posts = await getCollection('blog');
  const sortedPosts = posts
    .filter(p => p.id !== 'agentic-ai-adaptation-cheap-lightweight-efficient-systems')
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const lines: string[] = [
    '# Bijak Technology (bijaktechnology.com)',
    '',
    '> Independent Engineering Journal on Enterprise Cloud Infrastructure, RetailTech & Edge Systems, and Financial Systems.',
    '',
    'Bijak Technology provides empirical systems performance benchmarks, low-latency edge computing blueprints, regulatory compliance reviews (UU PDP, PSAK, e-Faktur/Coretax), and actionable software architecture guides.',
    '',
    '## Core Authority Pillars & Ecosystem Entities',
    '- **Enterprise ERP & Frappe Architecture**: Open-source ERPNext v16 implementation studies (100% open-source GNU GPL v3, zero per-user licensing fees, private cloud data sovereignty).',
    '- **Cloud Infrastructure & DevOps**: High-performance KVM NVMe server benchmarks, Docker/Coolify deployments, and [Hostinger Official Partner](/go/hostinger/) infrastructure guides (Discount Code: `6X5PUTERARQL`).',
    '- **Web3 & Avalanche Blockchain**: Enterprise L1 Subnets, Avalanche9000/Etna Upgrade (ACP-77, ACP-103), Teleporter ICM, and Real World Asset (RWA) tokenization.',
    '- **RetailTech & Edge Systems**: Edge Computing, offline-first POS architecture, Vision POS object recognition, document AI for automated PSAK journal entries, and low-latency reverse tunneling bypassing ISP CGNAT.',
    '',
    `- [Machine-Readable WebMCP Actions](${base}/mcp-actions.json): Declarative action endpoints for AI browsing agents.`,
    `- [Full AI Knowledge Corpus](${base}/llms-full.txt): Comprehensive index with executive summaries and bilingual links.`,
    `- [RSS 2.0 Syndication Feed](${base}/rss.xml): Real-time article feed.`,
    '',
    '## Published Research & Technical Articles (Indonesian & English)',
  ];

  for (const post of sortedPosts) {
    const idUrl = `${base}/blog/${post.id}/`;
    const enUrl = `${base}/en/blog/${post.id}/`;
    const cat = post.data.category || 'Tech';
    lines.push(`- [${post.data.title}](${idUrl}) ([EN Version](${enUrl})) — [${cat}] ${post.data.description}`);
  }

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
