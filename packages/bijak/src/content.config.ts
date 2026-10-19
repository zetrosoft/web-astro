import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  author: z.string().default('zetrosoft'),
  category: z.string().default('General'),
  tags: z.array(z.string()).default([]),
  social: z.object({
    twitter_thread: z.array(z.string()).optional(),
    linkedin: z.string().optional(),
    threads: z.string().optional(),
    facebook: z.string().optional()
  }).optional()
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: blogSchema,
});

const blog_en = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog_en" }),
  schema: blogSchema,
});

export const collections = { blog, blog_en };
