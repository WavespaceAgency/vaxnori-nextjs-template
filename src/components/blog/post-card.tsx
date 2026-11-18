import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/content-types";

/** Blog card: image, category + date, title, excerpt, "Read more". The whole card is one link. */
export function PostCard({ post, readMore, priority = false }: { post: Post; readMore: string; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col gap-4">
      <div className="relative aspect-[364/200] overflow-hidden rounded-card bg-[rgb(216_214_214/0.2)]">
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
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between gap-3 text-[10px] tracking-[0.02em]">
          <span className="rounded-[3px] bg-line-soft px-1.5 pt-px pb-[3px] leading-[14px] font-medium text-muted">{post.category}</span>
          <span className="leading-4 text-grey-2">
            <time dateTime={post.date}>{formatDate(post.date)}</time> • {post.readingTime.replace(" read", "")}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-1 text-base leading-[1.21] font-semibold tracking-[0.02em] text-ink">
            <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {post.title}
            </Link>
          </h3>
          <p className="line-clamp-2 text-xs leading-4 tracking-[0.02em] text-grey-2">{post.excerpt}</p>
        </div>
        <span aria-hidden="true" className="text-xs leading-[14px] font-medium tracking-[0.02em] text-brand underline decoration-from-font underline-offset-2 transition-colors group-hover:text-brand-hover">
          {readMore}
        </span>
      </div>
    </article>
  );
}
