import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchArticle } from "@/components/research-article";
import { getResearchItem, researchItems } from "@/data/research";

export function generateStaticParams() {
  return researchItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getResearchItem(slug);
  if (!item) return {};
  return { title: item.title, description: item.subtitle ?? item.description };
}

export default async function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getResearchItem(slug);
  if (!item) notFound();
  const index = researchItems.findIndex((entry) => entry.slug === item.slug);
  const previous = researchItems[index - 1];
  const next = researchItems[index + 1];
  return <ResearchArticle item={item} previous={previous} next={next} />;
}
