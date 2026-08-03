import Link from "next/link";
import { CompanyLogo } from "@/components/company-logo";
import { companies } from "@/data/library";

const latestResearch = [
  {
    type: "Project",
    status: "Final draft",
    title: "Competitive Moats in the AI Era",
    href: "/research/competitive-moats-ai-era",
    summary: "How artificial intelligence is reshaping the durability and sources of competitive advantage.",
  },
  {
    type: "Paper",
    status: "Complete",
    title: "Behavioral Biases in Investing",
    href: "/research/behavioral-biases-in-investing",
    summary: "Why sound analytical processes can still fail under pressure.",
  },
  {
    type: "Project",
    status: "In progress",
    title: "The Evolution of Payment Networks",
    href: "/research/evolution-payment-networks",
    summary: "A study of networks, scale, regulation, and economic moats.",
  },
];

function SectionHeading({ title, href, linkLabel }: { title: string; href: string; linkLabel: string }) {
  return (
    <div className="mb-7 flex items-baseline justify-between gap-6">
      <h2 className="text-xs font-semibold tracking-[0.14em] uppercase">{title}</h2>
      <Link href={href} className="text-xs text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink">
        {linkLabel}
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="h-1 bg-accent" />

        <section className="grid gap-10 border-b border-line py-[4.5rem] sm:py-[5.5rem] lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.7fr)] lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Independent research & analysis</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Studying the businesses and ideas that shape long-term value.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Independent equity research on technology, markets, business quality, and the frameworks investors use to make better decisions.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/research" className="bg-ink px-5 py-3 text-sm font-medium transition-opacity hover:opacity-85" style={{ color: "var(--canvas)" }}>
                Explore research
              </Link>
              <Link href="/about" className="border border-line px-5 py-3 text-sm font-medium transition-colors hover:bg-ink hover:text-canvas" style={{ color: "var(--ink)" }}>
                About my approach
              </Link>
            </div>
          </div>
          <aside className="self-end border-l-2 border-accent bg-[color-mix(in_srgb,var(--ink)_4%,transparent)] p-5 text-sm leading-6 text-muted">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-ink uppercase">Current focus</p>
            <p>AI and investment decision-making</p>
            <p>Competitive advantage in an AI-led economy</p>
            <p>Evolution of global payment networks</p>
          </aside>
        </section>

        <section className="border-b border-line py-12 sm:py-16">
          <SectionHeading title="Featured research" href="/research" linkLabel="View all research" />
          <article className="grid gap-8 bg-[color-mix(in_srgb,var(--ink)_5%,transparent)] p-7 sm:p-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(14rem,0.65fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Flagship project / Final draft</p>
              <h3 className="mt-3 font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">AI in Investing</h3>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
                An examination of how artificial intelligence is changing investment research, decision-making, and the enduring importance of human judgment.
              </p>
            </div>
            <div>
              <p className="text-sm text-muted">Research project</p>
              <Link href="/research/ai-in-investing" className="mt-5 inline-block text-sm font-semibold underline decoration-line underline-offset-4 transition-colors hover:text-accent">
                Read research &rarr;
              </Link>
            </div>
          </article>
        </section>

        <section className="border-b border-line py-12 sm:py-16">
          <SectionHeading title="Latest work" href="/research" linkLabel="Research archive" />
          <div className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {latestResearch.map((item, index) => (
              <Link key={item.title} href={item.href} className={`group block cursor-pointer py-7 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)] md:py-3 ${index === 0 ? "md:pr-7" : "md:px-7"} ${index === latestResearch.length - 1 ? "md:pr-0" : ""}`}>
                <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{item.type} / {item.status}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight tracking-[-0.025em] group-hover:underline group-hover:decoration-line group-hover:underline-offset-4">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-b border-line py-12 sm:py-16">
          <SectionHeading title="Company research library" href="/library/companies" linkLabel="View all companies" />
          <div className="grid grid-cols-2 border-t border-line sm:grid-cols-3 lg:grid-cols-5">
            {companies.map((company) => (
              <Link key={company.slug} href={`/library/companies/${company.slug}`} className="group flex min-h-24 cursor-pointer flex-col justify-between border-b border-r border-line px-4 py-4 transition-colors hover:bg-ink hover:text-canvas sm:px-5">
                <div className="flex items-center gap-2.5"><CompanyLogo company={company} /><span className="font-display text-xl tracking-[-0.02em]">{company.name}</span></div>
                <span className="mt-3 text-[0.62rem] font-semibold tracking-[0.1em] text-muted uppercase group-hover:text-canvas/70">{company.sector} · {company.coverageStatus}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Finance knowledge base</p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-[-0.035em]">Tools for thinking about value.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">Clear explainers covering DCF, cost of capital, capital allocation, ROIC, owner earnings, and more.</p>
            <Link href="/library/knowledge" className="mt-6 inline-block text-sm font-semibold underline decoration-line underline-offset-4 transition-colors hover:text-accent">Browse knowledge base &rarr;</Link>
          </div>
          <div className="border-l border-line pl-6 sm:pl-8">
            <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Investment frameworks</p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-[-0.035em]">A repeatable way to assess a business.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">Original frameworks for competitive moats, industry analysis, business quality, and company evaluation.</p>
            <Link href="/library/frameworks" className="mt-6 inline-block text-sm font-semibold underline decoration-line underline-offset-4 transition-colors hover:text-accent">Explore frameworks &rarr;</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
