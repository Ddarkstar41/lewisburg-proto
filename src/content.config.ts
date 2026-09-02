import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    author: z.string().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(),
    location: z.string().optional(),
    summary: z.string().optional(),
  }),
});

const issues = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/issues' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['action', 'monitoring', 'resolved', 'archived']).default('monitoring'),
    permit: z.string().optional(),
    summary: z.string().optional(),
    updated: z.coerce.date(),
    actionHeadline: z.string().optional(),
    actionDetail: z.string().optional(),
    actionDeadline: z.string().optional(),
    timeline: z
      .array(z.object({ date: z.string(), what: z.string() }))
      .default([]),
    documents: z
      .array(
        z.object({
          label: z.string(),
          kind: z.string().optional(),
          url: z.string().optional(),
          note: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { posts, events, issues };
