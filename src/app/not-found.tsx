import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-6xl items-center px-6 sm:px-10">
      <section>
        <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">404 / Not found</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-[-0.04em] sm:text-6xl">This page is not part of the research library.</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted">The address may have changed, or the research has not been published yet.</p>
        <Link href="/" className="mt-8 inline-block bg-ink px-5 py-3 text-sm font-medium text-[var(--canvas)]">Return home</Link>
      </section>
    </main>
  );
}
