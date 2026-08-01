import Link from "next/link";
import { CompanyLogo } from "@/components/company-logo";
import { PageIntro } from "@/components/page-intro";
import { companies } from "@/data/library";

export default function CompaniesPage() { return <main className="mx-auto max-w-6xl px-6 sm:px-10"><PageIntro eyebrow="Company research" title="Company coverage" description="A structured library of business-model analysis, financial questions, and long-term investment theses." /><section className="grid grid-cols-1 border-t border-line py-10 sm:grid-cols-2 lg:grid-cols-3">{companies.map((company) => <Link key={company.slug} href={`/library/companies/${company.slug}`} className="group cursor-pointer border-b border-r border-line px-5 py-6 transition-colors hover:bg-ink hover:text-canvas"><div className="flex items-center gap-3"><CompanyLogo company={company} /><h2 className="font-display text-2xl tracking-[-0.025em]">{company.name}</h2></div><p className="mt-4 text-xs font-semibold tracking-[0.12em] text-muted uppercase group-hover:text-canvas/70">{company.sector} · {company.coverageStatus}</p><p className="mt-5 text-sm font-medium">View coverage &rarr;</p></Link>)}</section></main>; }
