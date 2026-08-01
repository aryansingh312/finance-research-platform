import type { MetadataRoute } from "next";
import { companies } from "@/data/library";
import { researchItems } from "@/data/research";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const staticPages = ["", "/about", "/contact", "/resume", "/research", "/library", "/library/companies", "/library/knowledge", "/library/frameworks", "/search"];

  return [
    ...staticPages.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...researchItems.map((item) => ({ url: `${baseUrl}/research/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...companies.map((company) => ({ url: `${baseUrl}/library/companies/${company.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
