import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import { DocBlocks } from "@/components/docs/doc-blocks";
import { Button } from "@/components/ui/button";
import { blogPosts, getAdjacentPosts, getPost } from "@/content/blog";
import { blogCategoryById, formatPublished, readingMinutes } from "@/lib/blog-schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published,
      authors: [post.author],
      ...(post.hero ? { images: [{ url: post.hero.src }] } : {}),
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const category = blogCategoryById.get(post.category);
  const { newer, older } = getAdjacentPosts(post.slug);

  return (
    <div className="shell py-10 lg:py-14">
      <article className="mx-auto max-w-2xl">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/blog" className="transition-colors hover:text-foreground">
                Blog
              </Link>
            </li>
            <ChevronRightIcon className="size-3.5" aria-hidden />
            <li className="font-medium text-foreground">{category?.title}</li>
          </ol>
        </nav>

        <h1 className="display mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-border pb-6 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{post.author}</span>
          <span aria-hidden>·</span>
          <span>{formatPublished(post.published)}</span>
          <span aria-hidden>·</span>
          <span>{readingMinutes(post)} min read</span>
        </p>

        {post.hero && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-muted">
            <Image
              src={post.hero.src}
              alt={post.hero.alt}
              fill
              priority
              sizes="(min-width: 768px) 42rem, 92vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-10">
          <DocBlocks blocks={post.blocks} />
        </div>

        <div className="mt-16 rounded-2xl bg-muted p-6">
          <p className="font-semibold">Want this on your own network?</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            We are a carrier service provider, not a reseller. Send us the bill you pay
            now and we will price the same service at our published rates.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm" render={<Link href="/talk-to-sales" />}>
              Talk to sales
            </Button>
            <Button size="sm" variant="outline" render={<Link href="/pricing" />}>
              See the rate card
            </Button>
          </div>
        </div>

        {(newer || older) && (
          <nav
            aria-label="More articles"
            className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
          >
            {newer ? (
              <Link
                href={`/blog/${newer.slug}`}
                className="group rounded-2xl p-5 ring-1 ring-navy/8 transition-shadow hover:shadow-md hover:shadow-navy/8"
              >
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                  Newer
                </span>
                <span className="mt-1.5 block font-semibold">{newer.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {older && (
              <Link
                href={`/blog/${older.slug}`}
                className="group rounded-2xl p-5 text-right ring-1 ring-navy/8 transition-shadow hover:shadow-md hover:shadow-navy/8 sm:col-start-2"
              >
                <span className="flex items-center justify-end gap-1.5 text-sm text-muted-foreground">
                  Older
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1.5 block font-semibold">{older.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  );
}
