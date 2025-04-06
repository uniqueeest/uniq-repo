import { defineConfig, s, defineCollection } from 'velite';

const computedFields = <T extends { slug: string; id: string | number }>(
  data: T,
) => ({
  ...data,
  slugAsParams: data.slug.split('/').slice(1).join('/'),
  id: String(data.id),
});

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      id: s.union([s.string(), s.number()]).transform((val) => String(val)),
      title: s.string().max(99),
      description: s.string().max(999),
      thumbnailUrl: s.string().optional(),
      date: s.isodate(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  collections: {
    posts,
  },
});
