"use client";

import { useEffect, useState } from "react";

export type TableOfContentsEntry = { text: string; id: string; level: number };

export function TableOfContents({ entries }: { entries: TableOfContentsEntry[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const updateFromHash = () => setActiveId(window.location.hash.slice(1));
    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    const observer = new IntersectionObserver((observed) => {
      const activeEntry = observed.find((entry) => entry.isIntersecting);
      if (activeEntry) setActiveId(activeEntry.target.id);
    }, { rootMargin: "-20% 0px -70% 0px" });
    entries.forEach((entry) => document.getElementById(entry.id) && observer.observe(document.getElementById(entry.id)!));
    return () => {
      window.removeEventListener("hashchange", updateFromHash);
      observer.disconnect();
    };
  }, [entries]);

  return <ol className="mt-5 space-y-3">{entries.map((entry, index) => <li className={entry.level > 2 ? "ml-3" : ""} key={entry.id}><a aria-current={activeId === entry.id ? "location" : undefined} className={`text-sm leading-5 transition-colors hover:text-accent ${activeId === entry.id ? "text-accent" : "text-muted"}`} href={`#${entry.id}`}><span className="mr-2 text-accent">{String(index + 1).padStart(2, "0")}</span>{entry.text}</a></li>)}</ol>;
}
