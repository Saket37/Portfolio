import type { Metadata } from "next";

import { getAllPosts } from "@/lib/posts";
import { BlogCard } from "@/components/blog-card";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on Android development, Kotlin, and software craft.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-[1140px] px-5 pt-14 pb-[68px] sm:px-10">
      <SectionLabel accent="amber" className="mb-3">
        blog — things I&rsquo;ve been figuring out
      </SectionLabel>
      <h1 className="mb-10 text-[28px] font-bold text-head">
        <span className="text-brand-green">~</span>/blog
      </h1>

      {posts.length === 0 ? (
        <p className="text-[12.5px] text-ink-mute">
          $ ls posts/{" "}
          <span className="text-ink-faint">— nothing here yet, check back soon.</span>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard key={post.slugAsParams} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
