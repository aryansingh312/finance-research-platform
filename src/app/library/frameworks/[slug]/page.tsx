import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FrameworkProfile } from "@/components/framework-profile";
import { frameworks, getFramework } from "@/data/frameworks";

type FrameworkPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return frameworks.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: FrameworkPageProps): Promise<Metadata> {
  const framework = getFramework((await params).slug);
  return framework ? { title: `${framework.title} | Framework Library`, description: framework.purpose } : {};
}

export default async function FrameworkPage({ params }: FrameworkPageProps) {
  const framework = getFramework((await params).slug);
  if (!framework) notFound();
  const index = frameworks.findIndex((entry) => entry.slug === framework.slug);
  const related = (framework.relatedSlugs ?? []).flatMap((slug) => {
    const relatedFramework = getFramework(slug);
    return relatedFramework ? [relatedFramework] : [];
  });
  return <FrameworkProfile framework={framework} previous={frameworks[index - 1]} next={frameworks[index + 1]} related={related} />;
}
