import Link from "next/link";

import type { getAllPosts } from "@/lib/posts";
import { ACCENT_CYCLE, accentStripes, accentStyle, type Accent } from "@/lib/accents";

type Post = ReturnType<typeof getAllPosts>[number];

export function postAccent(post: Post, index: number): Accent {
  return post.accent ?? ACCENT_CYCLE[index % ACCENT_CYCLE.length];
}

export function readTime(post: Post): string {
  return `${Math.max(1, Math.round(post.metadata.readingTime))} min`;
}

/** Blog card with striped cover — used on the home teaser and /blog index. */
export function BlogCard({ post, index = 0 }: { post: Post; index?: number }) {
  const accent = postAccent(post, index);
  return (
    <Link
      href={`/blog/${post.slugAsParams}`}
      style={accentStyle(accent)}
      className="block h-full overflow-hidden rounded-[13px] border border-[rgba(var(--accent),0.16)] bg-panel transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[rgb(var(--accent))] hover:shadow-[8px_8px_0_rgba(var(--accent),0.14)]"
    >
      <div
        aria-hidden
        className="flex h-[120px] items-center justify-center bg-panel-alt text-2xl"
        style={{ backgroundImage: accentStripes(accent) }}
      >
        {post.glyph ?? "✍️"}
      </div>
      <div className="p-4">
        <p className="mb-2 text-[10.5px] text-[rgb(var(--accent))]">
          {post.category ?? post.tags[0] ?? "notes"} · {readTime(post)}
        </p>
        <h3 className="font-display text-[15px] leading-[1.4] font-bold text-head-soft">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}
