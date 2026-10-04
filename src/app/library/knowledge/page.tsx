import { PageIntro } from "@/components/page-intro";
import Link from "next/link";
import { knowledgeArticles } from "@/data/knowledge";

export default function KnowledgePage() {
  return <main className="mx-auto max-w-6xl px-6 sm:px-10">
    <PageIntro eyebrow="Finance knowledge base" title="The fundamentals of value." description="Source-led explanations of the accounting, economics, valuation, and judgment concepts behind long-term business analysis." />
    <section className="py-10 sm:py-14" aria-label="Knowledge Base articles">{knowledgeArticles.map((article, index) => <article key={article.slug} className="grid gap-4 border-t border-line py-8 sm:grid-cols-[8rem_minmax(0,1fr)]"><p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Concept {String(index + 1).padStart(2, "0")}</p><div><div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold tracking-[0.12em] text-muted uppercase"><span>{article.category}</span><span aria-hidden="true" className="text-line">/</span><span>{article.status}</span><span aria-hidden="true" className="text-line">/</span><span>{article.readingTime}</span></div><h2 className="mt-4 font-display text-3xl tracking-[-0.03em]"><Link className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" href={`/library/knowledge/${article.slug}`}>{article.title}</Link></h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{article.purpose}</p><Link href={`/library/knowledge/${article.slug}`} className="mt-5 inline-block text-sm font-semibold transition-colors hover:text-accent">Read article →</Link></div></article>)}</section>
  </main>;
}
