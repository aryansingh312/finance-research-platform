"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  const savedTheme = window.localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return getPreferredTheme();
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex size-9 items-center justify-center border border-line text-ink transition-colors hover:bg-ink hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label="Toggle color mode"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="1.6">
        <path d="M12 3v2.25M12 18.75V21M3 12h2.25M18.75 12H21M5.64 5.64l1.6 1.6M16.76 16.76l1.6 1.6M18.36 5.64l-1.6 1.6M7.24 16.76l-1.6 1.6" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    </button>
  );
}
