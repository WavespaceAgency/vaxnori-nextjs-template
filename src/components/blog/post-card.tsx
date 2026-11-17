import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/content-types";

/** Blog card: image, category + date, title, excerpt, "Read more". The whole card is one link. */
export function PostCard({ post, readMore, priority = false }: { post: Post; readMore: string; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col gap-4">
      <div className="relative aspect-[364/200] overflow-hidden bg-canvas">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority={priority}
          quality={90}
          sizes="(min-width: 1024px) 364px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-center justify-between gap-3 text-xs leading-4">
        <span className="rounded-[3px] border border-line bg-canvas px-1.5 py-0.5 font-medium text-ink">{post.category}</span>
        <span className="text-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time> • {post.readingTime.replace(" read", "")}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="line-clamp-1 text-base leading-6 font-semibold text-ink">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-5 text-muted">{post.excerpt}</p>
      </div>
      <span aria-hidden="true" className="text-sm font-medium text-brand-strong underline-offset-4 group-hover:underline">
        {readMore}
      </span>
    </article>
  );
}
