import { PageIntro } from "@/components/page-intro";
import { ResearchCard } from "@/components/research-card";
import { researchItems } from "@/data/research";

export default function ResearchPage() {
  const projects = researchItems.filter((item) => item.type === "Flagship Project" || item.type === "Project");
  const papers = researchItems.filter((item) => item.type === "Research Paper" || item.type === "Research paper");

  return <main className="mx-auto max-w-6xl px-6 sm:px-10"><PageIntro eyebrow="Original work" title="Research" description="Long-form work on investing, technology, business quality, and the forces shaping long-term value." /><section className="py-12 sm:py-16"><h2 className="mb-5 text-xs font-semibold tracking-[0.14em] uppercase">Flagship projects</h2>{projects.map((item) => <ResearchCard item={item} key={item.slug} />)}</section><section className="border-t border-line py-12 sm:py-16"><h2 className="mb-5 text-xs font-semibold tracking-[0.14em] uppercase">Research papers</h2>{papers.map((item) => <ResearchCard item={item} key={item.slug} />)}</section></main>;
}
