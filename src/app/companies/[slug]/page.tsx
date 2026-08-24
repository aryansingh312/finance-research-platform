import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyProfile } from "@/components/company-profile";
import { companies, getCompany } from "@/data/library";

type CompanyPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return companies.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const company = getCompany((await params).slug);
  if (!company) return {};
  return { title: `${company.name} research`, description: `Independent research on ${company.name}: its business model, financial analysis, and long-term investment thesis.` };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const company = getCompany((await params).slug);
  if (!company) notFound();
  const index = companies.findIndex((entry) => entry.slug === company.slug);
  const related = (company.relatedSlugs ?? []).flatMap((slug) => {
    const relatedCompany = getCompany(slug);
    return relatedCompany ? [relatedCompany] : [];
  });
  return <CompanyProfile company={company} previous={companies[index - 1]} next={companies[index + 1]} related={related} />;
}
