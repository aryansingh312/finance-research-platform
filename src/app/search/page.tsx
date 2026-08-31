import { PageIntro } from "@/components/page-intro";
import { SearchExplorer, type SearchEntry } from "@/components/search-explorer";
import { companies, knowledgeTopics } from "@/data/library";
import { frameworks } from "@/data/frameworks";
import { researchItems } from "@/data/research";

const entries: SearchEntry[] = [
  ...researchItems.map((item) => ({ title: item.title, description: item.description, href: `/research/${item.slug}`, category: item.type })),
  ...companies.map((company) => ({ title: company.name, description: `${company.sector} equity research report`, href: `/companies/${company.slug}`, category: "Company research" })),
  ...knowledgeTopics.map((topic) => ({ title: topic, description: "Finance knowledge-base topic", href: "/library/knowledge", category: "Knowledge base" })),
  ...frameworks.map((framework) => ({ title: framework.title, description: framework.purpose, href: `/library/frameworks/${framework.slug}`, category: framework.category })),
];

export default function SearchPage() { return <main className="mx-auto max-w-6xl px-6 sm:px-10"><PageIntro eyebrow="Search" title="Find a research note or concept." description="Search the public research index, company coverage, finance knowledge base, and investment framework library." /><SearchExplorer entries={entries} /></main>; }
