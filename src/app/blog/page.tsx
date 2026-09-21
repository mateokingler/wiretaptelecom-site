import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { blogPosts } from "@/content/blog";
import {
  blogCategoryById,
  formatPublished,
  readingMinutes,
  type BlogPost,
} from "@/lib/blog-schema";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and guides from the Wiretap Telecom team on SIP trunking, phone numbers, messaging, caller ID, emergency services, and the business of buying telecom.",
};

function Meta({ post }: { post: BlogPost }) {
  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
      <span className="rounded-full bg-tint-sky px-2.5 py-1 font-semibold text-navy-soft">
        {blogCategoryById.get(post.category)?.title}
      </span>
      <span>{formatPublished(post.published)}</span>
      <span aria-hidden>·</span>
      <span>{readingMinutes(post)} min read</span>
    </span>
  );
}

export default function Page() {
  const [featured, ...rest] = blogPosts;

  return (
    <div>
      <section className="pt-6 pb-14 lg:pb-18">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-18">
            <div className="aurora absolute inset-0 opacity-60" aria-hidden />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="eyebrow text-brand-sky">Blog</p>
              <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
                Notes from inside a carrier.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                {blogPosts.length} articles on trunking, numbers, messaging, caller ID,
                and what the telecom industry charges for it — written by the people who
                run the network.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24" aria-labelledby="latest-title">
        <div className="shell">
          <h2 id="latest-title" className="eyebrow text-brand-blue">
            Latest
          </h2>

          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-5 grid gap-8 rounded-[1.75rem] bg-card p-6 ring-1 ring-navy/8 transition-shadow hover:shadow-xl hover:shadow-navy/8 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12"
          >
            {featured.hero && (
              <span className="relative block aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-muted">
                <Image
                  src={featured.hero.src}
                  alt={featured.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </span>
            )}
            <span className="block">
              <Meta post={featured} />
              <span className="display mt-4 block text-3xl sm:text-4xl">
                {featured.title}
              </span>
              <span className="mt-4 block leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </span>
              <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand-blue">
                Read the article
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </span>
          </Link>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-24" aria-labelledby="archive-title">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Archive</p>
            <h2 id="archive-title" className="display mt-4 text-3xl sm:text-4xl">
              Everything else we have written.
            </h2>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-navy/8 transition-shadow hover:shadow-lg hover:shadow-navy/8"
                >
                  {post.hero && (
                    <span className="relative block aspect-[16/9] bg-muted">
                      <Image
                        src={post.hero.src}
                        alt={post.hero.alt}
                        fill
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
                        className="object-cover"
                      />
                    </span>
                  )}
                  <span className="flex flex-1 flex-col p-7">
                    <Meta post={post} />
                    <span className="mt-3 block text-lg leading-snug font-semibold">
                      {post.title}
                    </span>
                    <span className="mt-2.5 block text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
                      Read more
                      <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
