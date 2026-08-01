import Link from "next/link";
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
  const toc = ["Abstract", ...item.sections, ...(article?.footnotes?.length ? ["Footnotes"] : []), ...(article?.references?.length ? ["References"] : [])];

  return (
    <main className="mx-auto max-w-6xl px-6 sm:px-10">
      <article className="py-14 sm:py-20">
        <header className="max-w-4xl border-b border-line pb-10 sm:pb-12">
          <Link href="/research" className="text-xs font-semibold tracking-[0.14em] text-muted uppercase transition-colors hover:text-accent">Research / {item.type}</Link>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold tracking-[0.12em] uppercase">
            <span className="text-accent">{item.status}</span><span aria-hidden="true" className="text-line">/</span><span className="text-muted">Publication</span>
          </div>
          <h1 className="mt-5 font-display text-4xl leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">{item.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">{item.subtitle ?? item.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted"><span>By {author}</span><span aria-hidden="true">•</span><time>{date}</time><span aria-hidden="true">•</span><span>{item.readingTime}</span></div>
          <div className="mt-8">
            {item.pdfUrl ? <a href={item.pdfUrl} download className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ink hover:text-canvas"><DownloadIcon />Download PDF</a> : <span className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-sm text-muted"><DownloadIcon />PDF edition forthcoming</span>}
          </div>
        </header>

        <details className="mt-8 border-y border-line py-4 lg:hidden"><summary className="cursor-pointer text-xs font-semibold tracking-[0.14em] uppercase">Table of contents</summary><ol className="mt-4 space-y-2">{toc.map((heading, index) => <li key={heading}><a className="text-sm text-muted" href={`#${sectionId(heading)}`}><span className="mr-2 text-accent">{String(index + 1).padStart(2, "0")}</span>{heading}</a></li>)}</ol></details>

        <div className="mt-12 grid gap-12 lg:grid-cols-[12.5rem_minmax(0,46rem)] lg:gap-16">
          <aside className="hidden lg:block"><nav aria-label="Table of contents" className="sticky top-8 border-l border-line pl-5"><p className="text-xs font-semibold tracking-[0.14em] uppercase">Contents</p><ol className="mt-5 space-y-3">{toc.map((heading, index) => <li key={heading}><a className="text-sm leading-5 text-muted transition-colors hover:text-accent" href={`#${sectionId(heading)}`}><span className="mr-2 text-accent">{String(index + 1).padStart(2, "0")}</span>{heading}</a></li>)}</ol></nav></aside>
          <div className="min-w-0">
            <section id={sectionId("Abstract")} className="scroll-mt-8 border-l-2 border-accent bg-[color-mix(in_srgb,var(--accent)_5%,transparent)] px-5 py-6 sm:px-7"><p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Abstract</p><p className="mt-4 font-display text-xl leading-8 tracking-[-0.02em] sm:text-2xl sm:leading-9">{item.thesis}</p></section>
            <div className="mt-10 space-y-6 text-[1.05rem] leading-8 text-muted sm:text-lg sm:leading-8">{(article?.introduction ?? [item.description]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <section className="mt-10 border-y border-line py-7"><h2 className="text-xs font-semibold tracking-[0.14em] uppercase">Key takeaways</h2><ol className="mt-5 space-y-4">{item.takeaways.map((takeaway, index) => <li className="grid grid-cols-[2rem_1fr] gap-3 text-base leading-7 text-muted" key={takeaway}><span className="font-medium text-accent">{String(index + 1).padStart(2, "0")}</span><span>{takeaway}</span></li>)}</ol></section>
            {item.sections.map((heading, index) => <section id={sectionId(heading)} className="scroll-mt-8 pt-12 sm:pt-16" key={heading}><p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-3 font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">{heading}</h2><div className="mt-6 space-y-6 text-[1.05rem] leading-8 text-muted sm:text-lg sm:leading-8">{(article?.sectionCopy[heading] ?? [item.thesis, item.description]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{index === 1 && article?.figure ? <ArticleFigure figure={article.figure} /> : null}{index === 2 && article?.table ? <ArticleTable table={article.table} /> : null}</section>)}
            {article?.footnotes?.length ? <section id={sectionId("Footnotes")} className="scroll-mt-8 mt-14 border-t border-line pt-8"><h2 className="font-display text-2xl tracking-[-0.025em]">Footnotes</h2><ol className="mt-5 space-y-3 text-sm leading-6 text-muted">{article.footnotes.map((footnote, index) => <li className="grid grid-cols-[1.5rem_1fr] gap-2" key={footnote}><span className="text-accent">{index + 1}</span><span>{footnote}</span></li>)}</ol></section> : null}
            {article?.references?.length ? <section id={sectionId("References")} className="scroll-mt-8 mt-12 border-t border-line pt-8"><h2 className="font-display text-2xl tracking-[-0.025em]">References</h2><ol className="mt-5 space-y-4 text-sm leading-6 text-muted">{article.references.map((reference, index) => <li className="grid grid-cols-[1.5rem_1fr] gap-2" key={reference.title}><span className="text-accent">{index + 1}</span><span>{reference.href ? <a className="underline decoration-line underline-offset-4 hover:text-accent" href={reference.href}>{reference.title}</a> : reference.title}<span className="block">{reference.detail}</span></span></li>)}</ol></section> : null}
            <nav aria-label="Article navigation" className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2">{previous ? <Link href={`/research/${previous.slug}`} className="bg-canvas p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_6%,var(--canvas))]"><span className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Previous article</span><span className="mt-3 block font-display text-xl tracking-[-0.02em]">← {previous.title}</span></Link> : <div className="bg-canvas p-5" />}{next ? <Link href={`/research/${next.slug}`} className="bg-canvas p-5 text-right transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_6%,var(--canvas))]"><span className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Next article</span><span className="mt-3 block font-display text-xl tracking-[-0.02em]">{next.title} →</span></Link> : <div className="bg-canvas p-5" />}</nav>
          </div>
        </div>
      </article>
    </main>
  );
}

function ArticleFigure({ figure }: { figure: NonNullable<ResearchItem["article"]>["figure"] & {} }) {
  if (!figure) return null;
  return <figure className="mt-10 border border-line p-5 sm:p-7"><p className="text-xs font-semibold tracking-[0.14em] uppercase">Figure 1</p><h3 className="mt-3 font-display text-xl tracking-[-0.02em]">{figure.title}</h3><div className="mt-7 space-y-4">{figure.values.map((item) => <div key={item.label}><div className="mb-2 flex justify-between gap-4 text-sm text-muted"><span>{item.label}</span><span>{item.value}</span></div><div className="h-1.5 bg-line"><div className="h-full bg-accent" style={{ width: `${item.value}%` }} /></div></div>)}</div><figcaption className="mt-7 border-t border-line pt-4 text-sm leading-6 text-muted">{figure.caption}<span className="mt-2 block text-xs">Source: {figure.source}</span></figcaption></figure>;
}

function ArticleTable({ table }: { table: NonNullable<ResearchItem["article"]>["table"] & {} }) {
  if (!table) return null;
  return <div className="mt-10 overflow-x-auto border border-line"><table className="w-full min-w-[38rem] border-collapse text-left text-sm leading-6"><caption className="caption-top px-5 py-4 text-left text-sm text-muted">{table.caption}</caption><thead className="border-y border-line bg-[color-mix(in_srgb,var(--accent)_4%,transparent)]"><tr>{table.headers.map((header) => <th className="px-5 py-3 font-semibold" scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{table.rows.map((row) => <tr className="border-b border-line last:border-b-0" key={row[0]}>{row.map((cell) => <td className="px-5 py-4 align-top text-muted" key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
