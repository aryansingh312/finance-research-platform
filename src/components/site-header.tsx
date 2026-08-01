"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const primaryLinks = [
  { href: "/research", label: "Research" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 sm:px-10">
        <Link href="/" className="group shrink-0" onClick={() => setMenuOpen(false)}>
          <span className="block font-display text-xl leading-none tracking-[-0.03em]">Aryan Singh</span>
          <span className="mt-1 block text-[0.62rem] font-semibold tracking-[0.14em] text-muted uppercase">
            Independent Finance Researcher
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
          <Link href="/search" className="border-l border-line pl-6 text-muted transition-colors hover:text-ink">
            Search
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-9 items-center justify-center border border-line text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <span aria-hidden="true">{menuOpen ? "×" : "Menu"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="border-t border-line px-6 py-4 sm:px-10 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-6xl gap-1">
            {[...primaryLinks, { href: "/search", label: "Search" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
