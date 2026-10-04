import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeArticlePage } from "@/components/knowledge-article";
import { getKnowledgeArticle, knowledgeArticles } from "@/data/knowledge";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return knowledgeArticles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getKnowledgeArticle((await params).slug);
  return article ? { title: `${article.title} | Finance Knowledge Base`, description: article.purpose } : {};
}
export default async function KnowledgeDetailPage({ params }: Props) {
  const article = getKnowledgeArticle((await params).slug);
  if (!article) notFound();
  const index = knowledgeArticles.findIndex((item) => item.slug === article.slug);
  const related = article.relatedSlugs.flatMap((slug) => {
    const item = getKnowledgeArticle(slug);
    return item ? [item] : [];
  });
  return <KnowledgeArticlePage article={article} previous={knowledgeArticles[index - 1]} next={knowledgeArticles[index + 1]} related={related} />;
}
