import { Fragment } from "react";
import Link from "next/link";
import type { ArticleBlock } from "@/data/ai-in-investing";
import { AiInvestingVisual, essentialVisualSections } from "@/components/ai-investing-visuals";
import type { ResearchItem } from "@/data/research";

type ArticleNavigation = { slug: string; title: string } | undefined;

function sectionId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function DownloadIcon() {
  return <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" /></svg>;
}

export function ResearchArticle({ item, previous, next }: { item: ResearchItem; previous: ArticleNavigation; next: ArticleNavigation }) {
  const article = item.article;
  const author = item.author ?? "Aryan Singh";
  const date = item.publicationDate ?? item.published;
  const blocks = item.blocks;
  const toc = blocks
    ? blocks.flatMap((block, index) => block.kind === "heading" && block.level === 1 && /^Chapter \d+:/.test(block.text) ? [{ text: block.text, id: `section-${index}-${sectionId(block.text)}`, level: block.level }] : [])
    : ["Abstract", ...item.sections, ...(article?.footnotes?.length ? ["Footnotes"] : []), ...(article?.references?.length ? ["References"] : [])].map((text) => ({ text, id: sectionId(text), level: 2 }));

  return (
    <main className="mx-auto max-w-6xl px-6 sm:px-10">
      <article className="py-14 sm:py-20">
        <header className="max-w-4xl border-b border-line pb-10 sm:pb-12">
          <Link href="/research" className="text-xs font-semibold tracking-[0.14em] text-muted uppercase transition-colors hover:text-accent">Research / {item.type}</Link>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold tracking-[0.12em] uppercase"><span className="text-accent">{item.status}</span><span aria-hidden="true" className="text-line">/</span><span className="text-muted">Publication</span></div>
          <h1 className="mt-5 font-display text-4xl leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">{item.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">{item.subtitle ?? item.description}</p>
          <dl className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted"><div className="flex items-center gap-1.5"><dt className="sr-only">Author</dt><dd>By {author}</dd></div><div aria-hidden="true">•</div><div className="flex items-center gap-1.5"><dt className="sr-only">Publication date</dt><dd><time dateTime={item.slug === "ai-in-investing" ? "2026-07-04" : undefined}>Published {date}</time></dd></div><div aria-hidden="true">•</div><div className="flex items-center gap-1.5"><dt className="sr-only">Reading time</dt><dd>{item.readingTime}</dd></div></dl>
          <div className="mt-8">{item.pdfUrl ? <a href={item.pdfUrl} download className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ink hover:text-canvas"><DownloadIcon />Download PDF</a> : <span className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-sm text-muted"><DownloadIcon />PDF edition forthcoming</span>}</div>
        </header>

        <details className="mt-8 border-y border-line py-4 lg:hidden"><summary className="cursor-pointer text-xs font-semibold tracking-[0.14em] uppercase">Table of contents</summary><TableOfContents entries={toc} /></details>
        <div className="mt-12 grid gap-12 lg:grid-cols-[12.5rem_minmax(0,46rem)] lg:gap-16">
          <aside className="hidden lg:block"><nav aria-label="Table of contents" className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto border-l border-line pl-5"><p className="text-xs font-semibold tracking-[0.14em] uppercase">Contents</p><TableOfContents entries={toc} /></nav></aside>
          <div className="min-w-0">
            {blocks ? <LongformContent blocks={blocks} articleTitle={item.title} /> : <LegacyContent item={item} />}
            <ArticleNavigation previous={previous} next={next} />
          </div>
        </div>
      </article>
    </main>
  );
}

function TableOfContents({ entries }: { entries: { text: string; id: string; level: number }[] }) {
  return <ol className="mt-5 space-y-3">{entries.map((entry, index) => <li className={entry.level > 2 ? "ml-3" : ""} key={entry.id}><a className="text-sm leading-5 text-muted transition-colors hover:text-accent" href={`#${entry.id}`}><span className="mr-2 text-accent">{String(index + 1).padStart(2, "0")}</span>{entry.text}</a></li>)}</ol>;
}

function LongformContent({ blocks, articleTitle }: { blocks: ArticleBlock[]; articleTitle: string }) {
  return <div className="text-[1.05rem] leading-8 text-muted sm:text-lg sm:leading-8">{blocks.map((block, index) => {
    if (shouldHideImportBlock(blocks, index, articleTitle)) return null;
    const visual = visualAfterSection(blocks, index);
    if (block.kind === "paragraph") return <Fragment key={index}><p className="mt-6 whitespace-pre-line">{block.text}</p>{visual ? <AiInvestingVisual id={visual} /> : null}</Fragment>;
    if (block.kind === "table") return <Fragment key={index}><SourceTable rows={block.rows} />{visual ? <AiInvestingVisual id={visual} /> : null}</Fragment>;
    const id = `section-${index}-${sectionId(block.text)}`;
    const headingClasses = block.level === 1 ? "mt-14 font-display text-3xl leading-tight tracking-[-0.035em] text-ink sm:mt-20 sm:text-4xl" : block.level === 2 ? "mt-12 font-display text-2xl leading-tight tracking-[-0.03em] text-ink sm:mt-16 sm:text-3xl" : block.level === 3 ? "mt-10 font-display text-xl leading-tight tracking-[-0.02em] text-ink sm:mt-12 sm:text-2xl" : "mt-8 text-base font-semibold tracking-[-0.01em] text-ink sm:text-lg";
    const Heading = block.level === 1 ? "h2" : block.level === 2 ? "h3" : block.level === 3 ? "h4" : "h5";
    return <Fragment key={index}><Heading className={`${headingClasses} scroll-mt-8`} id={id}>{block.text}</Heading>{visual ? <AiInvestingVisual id={visual} /> : null}</Fragment>;
  })}</div>;
}

function shouldHideImportBlock(blocks: ArticleBlock[], index: number, articleTitle: string) {
  const block = blocks[index];
  if (block.kind === "paragraph" && /^Author-[^\n]+\s*\nDate-.+$/.test(block.text)) return true;
  if (block.kind !== "heading") return false;
  if (block.text === articleTitle && !blocks.slice(0, index).some((entry) => entry.kind === "heading" && entry.text === articleTitle)) return true;
  const chapter = [...blocks.slice(0, index)].reverse().find((entry): entry is Extract<ArticleBlock, { kind: "heading" }> => entry.kind === "heading" && entry.level === 1 && /^Chapter \d+:/.test(entry.text));
  return chapter ? chapter.text.replace(/^Chapter \d+:\s*/, "") === block.text : false;
}

function visualAfterSection(blocks: ArticleBlock[], currentIndex: number) {
  for (const visual of essentialVisualSections) {
    const sectionIndex = blocks.findIndex((block) => block.kind === "heading" && block.text === visual.heading);
    if (sectionIndex === -1 || currentIndex < sectionIndex) continue;
    const section = blocks[sectionIndex];
    if (section.kind !== "heading") continue;
    const nextPeer = blocks.findIndex((block, index) => index > sectionIndex && block.kind === "heading" && block.level <= section.level);
    const endIndex = nextPeer === -1 ? blocks.length - 1 : nextPeer - 1;
    if (currentIndex === endIndex) return visual.id;
  }
  return undefined;
}

function SourceTable({ rows }: { rows: string[][] }) {
  const [headers, ...body] = rows;
  return <div className="mt-10 overflow-x-auto border border-line"><table className="w-full min-w-[38rem] border-collapse text-left text-sm leading-6"><thead className="border-y border-line bg-[color-mix(in_srgb,var(--accent)_4%,transparent)]"><tr>{headers.map((header, index) => <th className="px-5 py-3 font-semibold" scope="col" key={`${header}-${index}`}>{header}</th>)}</tr></thead><tbody>{body.map((row, rowIndex) => <tr className="border-b border-line last:border-b-0" key={rowIndex}>{row.map((cell, cellIndex) => <td className="px-5 py-4 align-top text-muted" key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function LegacyContent({ item }: { item: ResearchItem }) {
  const article = item.article;
  return <><section id={sectionId("Abstract")} className="scroll-mt-8 border-l-2 border-accent bg-[color-mix(in_srgb,var(--accent)_5%,transparent)] px-5 py-6 sm:px-7"><p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Abstract</p><p className="mt-4 font-display text-xl leading-8 tracking-[-0.02em] sm:text-2xl sm:leading-9">{item.thesis}</p></section><div className="mt-10 space-y-6 text-[1.05rem] leading-8 text-muted sm:text-lg sm:leading-8">{(article?.introduction ?? [item.description]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><section className="mt-10 border-y border-line py-7"><h2 className="text-xs font-semibold tracking-[0.14em] uppercase">Key takeaways</h2><ol className="mt-5 space-y-4">{item.takeaways.map((takeaway, index) => <li className="grid grid-cols-[2rem_1fr] gap-3 text-base leading-7 text-muted" key={takeaway}><span className="font-medium text-accent">{String(index + 1).padStart(2, "0")}</span><span>{takeaway}</span></li>)}</ol></section>{item.sections.map((heading, index) => <section id={sectionId(heading)} className="scroll-mt-8 pt-12 sm:pt-16" key={heading}><p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-3 font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">{heading}</h2><div className="mt-6 space-y-6 text-[1.05rem] leading-8 text-muted sm:text-lg sm:leading-8">{(article?.sectionCopy[heading] ?? [item.thesis, item.description]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{index === 1 && article?.figure ? <ArticleFigure figure={article.figure} /> : null}{index === 2 && article?.table ? <ArticleTable table={article.table} /> : null}</section>)}</>;
}

function ArticleNavigation({ previous, next }: { previous: ArticleNavigation; next: ArticleNavigation }) {
  return <nav aria-label="Article navigation" className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2">{previous ? <Link href={`/research/${previous.slug}`} className="bg-canvas p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_6%,var(--canvas))]"><span className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Previous article</span><span className="mt-3 block font-display text-xl tracking-[-0.02em]">← {previous.title}</span></Link> : <div className="bg-canvas p-5" />}{next ? <Link href={`/research/${next.slug}`} className="bg-canvas p-5 text-right transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_6%,var(--canvas))]"><span className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Next article</span><span className="mt-3 block font-display text-xl tracking-[-0.02em]">{next.title} →</span></Link> : <div className="bg-canvas p-5" />}</nav>;
}

function ArticleFigure({ figure }: { figure: NonNullable<ResearchItem["article"]>["figure"] & {} }) {
  if (!figure) return null;
  return <figure className="mt-10 border border-line p-5 sm:p-7"><p className="text-xs font-semibold tracking-[0.14em] uppercase">Figure 1</p><h3 className="mt-3 font-display text-xl tracking-[-0.02em]">{figure.title}</h3><div className="mt-7 space-y-4">{figure.values.map((item) => <div key={item.label}><div className="mb-2 flex justify-between gap-4 text-sm text-muted"><span>{item.label}</span><span>{item.value}</span></div><div className="h-1.5 bg-line"><div className="h-full bg-accent" style={{ width: `${item.value}%` }} /></div></div>)}</div><figcaption className="mt-7 border-t border-line pt-4 text-sm leading-6 text-muted">{figure.caption}<span className="mt-2 block text-xs">Source: {figure.source}</span></figcaption></figure>;
}

function ArticleTable({ table }: { table: NonNullable<ResearchItem["article"]>["table"] & {} }) {
  if (!table) return null;
  return <div className="mt-10 overflow-x-auto border border-line"><table className="w-full min-w-[38rem] border-collapse text-left text-sm leading-6"><caption className="caption-top px-5 py-4 text-left text-sm text-muted">{table.caption}</caption><thead className="border-y border-line bg-[color-mix(in_srgb,var(--accent)_4%,transparent)]"><tr>{table.headers.map((header) => <th className="px-5 py-3 font-semibold" scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{table.rows.map((row) => <tr className="border-b border-line last:border-b-0" key={row[0]}>{row.map((cell) => <td className="px-5 py-4 align-top text-muted" key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
