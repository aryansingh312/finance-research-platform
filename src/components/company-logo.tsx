import Image from "next/image";
import type { Company } from "@/data/library";

const assetByCompany: Record<Company["slug"], string> = {
  apple: "apple",
  microsoft: "microsoft",
  nvidia: "nvidia",
  google: "google",
  amazon: "amazon",
  meta: "meta",
  visa: "visa",
  mastercard: "mastercard",
  "american-express": "americanexpress",
  moodys: "moodys",
};

const wordmarkCompanies = new Set<Company["slug"]>(["amazon", "nvidia", "visa", "moodys"]);

export function CompanyLogo({ company }: { company: Company }) {
  const isWordmark = wordmarkCompanies.has(company.slug);

  return (
    <span className="flex size-6 shrink-0 items-center justify-center" aria-hidden="true">
      <Image
        src={`/logos/${assetByCompany[company.slug]}.svg`}
        alt=""
        width={28}
        height={28}
        className={`${isWordmark ? "h-5 w-7" : "size-5"} company-logo-image object-contain`}
      />
    </span>
  );
}
