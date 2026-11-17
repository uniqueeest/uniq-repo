import { defineConfig, defineCollection, s } from 'velite';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.{md,mdx}',
  schema: s
    .object({
      path: s.path(),
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      tag: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform(({ path, ...data }) => ({
      ...data,
      slug: path.split('/').pop()!,
    })),
});

export default defineConfig({
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: { light: 'github-light', dark: 'github-dark-dimmed' },
          keepBackground: false,
        },
      ],
    ],
  },
});
