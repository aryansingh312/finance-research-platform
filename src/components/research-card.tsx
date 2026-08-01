import Link from "next/link";
import type { ResearchItem } from "@/data/research";

export function ResearchCard({ item }: { item: ResearchItem }) {
  return (
    <article className="border-t border-line py-7 first:border-t-0 sm:py-9">
      <div className="grid gap-4 md:grid-cols-[10rem_minmax(0,1fr)_9rem] md:gap-8">
        <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{item.type}<br />{item.status}</p>
        <div>
          <h2 className="font-display text-2xl leading-tight tracking-[-0.025em] sm:text-3xl"><Link href={`/research/${item.slug}`} className="transition-colors hover:text-accent">{item.title}</Link></h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{item.description}</p>
        </div>
        <p className="text-sm text-muted md:text-right">{item.published}<br />{item.readingTime}</p>
      </div>
    </article>
  );
}
