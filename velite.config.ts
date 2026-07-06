import { defineConfig, s } from "velite";

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    posts: {
      name: "Post",
      pattern: "blog/**/*.mdx",
      schema: s
        .object({
          title: s.string().max(99),
          description: s.string().max(999).optional(),
          date: s.isodate(),
          published: s.boolean().default(true),
          tags: s.array(s.string()).default([]),
          category: s.string().optional(),
          glyph: s.string().optional(),
          accent: s.enum(["green", "amber", "cyan", "pink", "purple"]).optional(),
          slug: s.path(),
          metadata: s.metadata(),
          body: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          slugAsParams: data.slug.split("/").slice(1).join("/"),
        })),
    },
  },
});
