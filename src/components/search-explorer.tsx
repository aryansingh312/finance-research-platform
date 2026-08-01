"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type SearchEntry = { title: string; description: string; href: string; category: string };

export function SearchExplorer({ entries }: { entries: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return entries;
    return entries.filter((entry) => `${entry.title} ${entry.description} ${entry.category}`.toLowerCase().includes(term));
  }, [entries, query]);

  return <section className="py-10 sm:py-14"><label htmlFor="site-search" className="sr-only">Search research and library</label><input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search research, companies, and concepts" className="w-full border-b border-ink bg-transparent px-0 py-4 text-xl outline-none placeholder:text-muted focus:border-accent sm:text-2xl" autoFocus /><p className="mt-5 text-sm text-muted">{results.length} {results.length === 1 ? "result" : "results"}</p><div className="mt-5">{results.map((result) => <Link key={result.href} href={result.href} className="block border-t border-line py-6 transition-colors hover:text-accent"><p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{result.category}</p><h2 className="mt-2 font-display text-2xl tracking-[-0.025em]">{result.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{result.description}</p></Link>)}{results.length === 0 && <p className="border-t border-line py-8 text-sm text-muted">No matching research or library entries yet.</p>}</div></section>;
}
