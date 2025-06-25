import { defineConfig, s, defineCollection } from 'velite';
import rehypePrism from 'rehype-prism-plus';

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slug: data.slug.split('/').pop()?.replace(/\.md$/, '') || data.slug,
  slugAsParams: data.slug.split('/').slice(1).join('/'),
});

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.md',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      tag: s.array(s.string()).optional(),
      content: s.markdown({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rehypePlugins: [rehypePrism as any],
      }),
    })
    .transform(computedFields),
});

export default defineConfig({
  collections: {
    posts,
  },
});
