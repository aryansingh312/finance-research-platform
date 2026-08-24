import { redirect } from "next/navigation";

export default async function LegacyCompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  redirect(`/companies/${(await params).slug}`);
}
