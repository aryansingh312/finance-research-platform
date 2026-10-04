import Link from "next/link";
import { useId } from "react";
import { TableOfContents } from "@/components/table-of-contents";
import type { KnowledgeArticle, KnowledgeBlock } from "@/data/knowledge";

function Diagram({ block }: { block: Extract<KnowledgeBlock, { type: "diagram" }> }) {
  const id = useId().replaceAll(":", "");
  const columns = block.kind === "flow" ? 1 : 2;
  const rows = Math.ceil(block.nodes.length / columns);
  return <figure className="my-10 border border-line p-4 sm:p-7">
    <h3 className="font-display text-xl text-ink sm:text-2xl">{block.title}</h3>
    <div className="mt-6 overflow-x-auto" role="region" aria-label={block.title} tabIndex={0}>
      <svg viewBox={`0 0 600 ${rows * 108 + 24}`} className="h-auto min-w-[32rem] w-full" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{block.title}</title><desc id={`${id}-desc`}>{block.caption}</desc>
        {block.nodes.map((label, index) => {
          const x = columns === 1 ? 80 : 20 + (index % 2) * 290;
          const y = 12 + Math.floor(index / columns) * 108;
          const labelWords = label.split(" ");
          const lines: string[] = [];
          for (const word of labelWords) {
            if (!lines.length || (lines[lines.length - 1] + " " + word).length > 23) lines.push(word);
            else lines[lines.length - 1] += " " + word;
          }
          const center = x + (columns === 1 ? 220 : 135);
          return <g key={label}><rect x={x} y={y} width={columns === 1 ? 440 : 270} height="82" rx="3" fill="var(--canvas)" stroke="var(--accent)" strokeWidth="1.5" /><text x={center} y={y + 43 - (lines.length - 1) * 9} textAnchor="middle" fill="var(--ink)" fontSize="16" fontWeight="600">{lines.map((line, lineIndex) => <tspan key={line} x={center} dy={lineIndex ? 19 : 0}>{line}</tspan>)}</text>{block.kind === "flow" && index < block.nodes.length - 1 ? <><line x1="300" y1={y + 83} x2="300" y2={y + 102} stroke="var(--accent)" strokeWidth="1.5" /><path d={`M294 ${y + 98} L300 ${y + 105} L306 ${y + 98}`} fill="none" stroke="var(--accent)" strokeWidth="1.5" /></> : null}</g>;
        })}
      </svg>
    </div>
    <figcaption className="mt-5 border-t border-line pt-4 text-sm leading-6 text-muted">{block.caption}</figcaption>
  </figure>;
}

function SourceTable({ rows, label }: { rows: string[][]; label: string }) {
  if (!rows.length) return null;
  const [headers, ...body] = rows;
  return <div role="region" aria-label={label} tabIndex={0} className="my-9 overflow-x-auto border border-line focus-visible:outline-2 focus-visible:outline-accent"><table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-6"><caption className="sr-only">{label}</caption><thead className="bg-[color-mix(in_srgb,var(--accent)_5%,transparent)]"><tr>{headers.map((cell, index) => <th key={index} scope="col" className="border-b border-line px-5 py-3 font-semibold text-ink">{cell}</th>)}</tr></thead><tbody>{body.map((row, index) => <tr key={index} className="border-b border-line last:border-0">{row.map((cell, cellIndex) => cellIndex === 0 ? <th scope="row" className="px-5 py-4 align-top font-medium text-ink" key={cellIndex}>{cell}</th> : <td className="px-5 py-4 align-top text-muted" key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function Blocks({ blocks, articleTitle }: { blocks: KnowledgeBlock[]; articleTitle: string }) {
  return <div className="text-[1.05rem] leading-8 text-muted sm:text-lg">{blocks.map((block, index) => {
    if (block.type === "heading") return block.level === 4 ? <h4 key={index} className="mt-8 font-display text-xl leading-tight text-ink">{block.text}</h4> : <h3 key={index} className="mt-10 font-display text-2xl leading-tight text-ink">{block.text}</h3>;
    if (block.type === "table") return <SourceTable key={index} rows={block.rows} label={`${articleTitle} table ${index + 1}`} />;
    if (block.type === "diagram") return <Diagram key={index} block={block} />;
    const formula = block.text.length < 180 && /[=÷×]/.test(block.text);
    return <p key={index} className={formula ? "my-5 overflow-x-auto border-l-2 border-accent pl-4 font-medium text-ink" : "mt-3 whitespace-pre-line"}>{block.text}</p>;
  })}</div>;
}

export function KnowledgeArticlePage({ article, previous, next, related }: { article: KnowledgeArticle; previous?: KnowledgeArticle; next?: KnowledgeArticle; related: KnowledgeArticle[] }) {
  const toc = article.sections.map(({ id, title }) => ({ id, text: title, level: 2 }));
  return <main className="mx-auto max-w-6xl px-6 sm:px-10"><article className="py-14 sm:py-20">
    <header className="max-w-4xl border-b border-line pb-10 sm:pb-12">
      <Link href="/library/knowledge" className="text-xs font-semibold tracking-[0.14em] text-muted uppercase transition-colors hover:text-accent">Finance Knowledge Base</Link>
      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold tracking-[0.12em] uppercase"><span className="text-accent">{article.category}</span><span aria-hidden="true" className="text-line">/</span><span className="text-muted">{article.status}</span><span aria-hidden="true" className="text-line">/</span><span className="text-muted">{article.readingTime}</span></div>
      <h1 className="mt-6 font-display text-4xl leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">{article.title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">{article.purpose}</p>
    </header>
    <details className="mt-8 border-y border-line py-4 lg:hidden"><summary className="cursor-pointer text-xs font-semibold tracking-[0.14em] uppercase">Table of contents</summary><TableOfContents entries={toc} /></details>
    <div className="mt-12 grid gap-12 lg:grid-cols-[12.5rem_minmax(0,46rem)] lg:gap-16">
      <aside className="hidden lg:block"><nav aria-label="Table of contents" className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto border-l border-line pl-5"><p className="text-xs font-semibold tracking-[0.14em] uppercase">Contents</p><TableOfContents entries={toc} /></nav></aside>
      <div className="min-w-0">
        {article.slug === "financial-ratios" ? <p className="border-l-2 border-accent pl-5 text-sm leading-6 text-muted">The source’s interpretive ranges are contextual heuristics, not universal thresholds or a scoring system. Compare ratios with the business and its industry.</p> : null}
        {article.slug === "margin-of-safety" ? <p className="border-l-2 border-accent pl-5 text-sm leading-6 text-muted">The calculation examples in this article are illustrations from the source, not current company valuations or entry-price guidance.</p> : null}
        {article.sections.map((section, index) => <section key={section.id} id={section.id} className="scroll-mt-8 pt-12 sm:pt-16"><p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-3 font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">{section.title}</h2><Blocks blocks={section.blocks} articleTitle={article.title} /></section>)}
        {article.frameworkLinks?.length ? <section className="mt-16 border-t border-line pt-8"><h2 className="text-xs font-semibold tracking-[0.14em] uppercase">Apply the concept</h2><div className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2">{article.frameworkLinks.map((item) => <Link key={item.slug} href={`/library/frameworks/${item.slug}`} className="bg-canvas p-5 transition-colors hover:text-accent"><span className="font-display text-xl">{item.title}</span><span className="mt-2 block text-sm text-muted">Open the application framework →</span></Link>)}</div></section> : null}
        {related.length ? <section className="mt-16 border-t border-line pt-8"><h2 className="text-xs font-semibold tracking-[0.14em] uppercase">Related concepts</h2><div className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2">{related.map((item) => <Link key={item.slug} href={`/library/knowledge/${item.slug}`} className="bg-canvas p-5 transition-colors hover:text-accent"><span className="font-display text-xl">{item.title}</span><span className="mt-2 block text-sm text-muted">{item.category}</span></Link>)}</div></section> : null}
        <nav aria-label="Knowledge Base navigation" className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2">{previous ? <Link href={`/library/knowledge/${previous.slug}`} className="bg-canvas p-5 transition-colors hover:text-accent"><span className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Previous article</span><span className="mt-3 block font-display text-xl">← {previous.title}</span></Link> : <div className="bg-canvas p-5" />}{next ? <Link href={`/library/knowledge/${next.slug}`} className="bg-canvas p-5 text-right transition-colors hover:text-accent"><span className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Next article</span><span className="mt-3 block font-display text-xl">{next.title} →</span></Link> : <div className="bg-canvas p-5" />}</nav>
      </div>
    </div>
  </article></main>;
}
