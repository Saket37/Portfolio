import Link from "next/link";

import { getAllPosts } from "@/lib/posts";
import { BlogCard } from "@/components/blog-card";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

export function BlogTeaser() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog">
      <div className="mx-auto max-w-[1140px] px-5 pb-[58px] sm:px-10">
        <Reveal>
          <div className="mb-[18px] flex items-baseline justify-between">
            <SectionLabel accent="amber">
              blog — things I&rsquo;ve been figuring out
            </SectionLabel>
            <Link
              href="/blog"
              className="text-[11.5px] text-brand-green transition-colors hover:text-head-soft"
            >
              cd /blog →
            </Link>
          </div>
        </Reveal>
        {posts.length === 0 ? (
          <p className="text-[12.5px] text-ink-mute">
            $ ls posts/ <span className="text-ink-faint">— nothing here yet, check back soon.</span>
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slugAsParams} delay={i * 90}>
                <BlogCard post={post} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
