import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { postAccent, readTime } from "@/components/blog-card";
import { accentStyle } from "@/lib/accents";
import { MDXContent } from "@/components/mdx-content";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slugAsParams }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const accent = postAccent(post, 0);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-[720px] px-5 pt-14 pb-[68px]">
      <p className="mb-6 text-xs text-ink-mute">
        <Link href="/blog" className="transition-colors hover:text-brand-green">
          ~/blog
        </Link>
        /<span className="text-brand-green">{post.slugAsParams}</span>
      </p>

      <h1 className="font-display mb-4 text-[32px] leading-[1.15] font-bold tracking-[-0.02em] text-head md:text-[40px]">
        {post.title}
      </h1>

      <p className="mb-10 text-xs text-ink-mute" style={accentStyle(accent)}>
        <span className="text-[rgb(var(--accent))]">
          {post.category ?? post.tags[0] ?? "notes"}
        </span>{" "}
        · {date} · {readTime(post)}
      </p>

      <div className="prose prose-invert prose-headings:font-display prose-headings:text-head prose-a:text-brand-green prose-strong:text-head-soft prose-code:text-brand-green max-w-none text-sm leading-[1.8] text-ink">
        <MDXContent code={post.body} />
      </div>
    </article>
  );
}
