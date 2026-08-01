import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>&copy; {new Date().getFullYear()} Aryan Singh</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/contact" className="transition-colors hover:text-ink">Contact</Link>
          <Link href="/resume" className="transition-colors hover:text-ink">Resume</Link>
          <span>Independent research published for educational and informational purposes.</span>
        </div>
      </div>
    </footer>
  );
}
