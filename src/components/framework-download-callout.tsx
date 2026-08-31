type FrameworkDownloadCalloutProps = { pdfUrl?: string };

function DownloadIcon() {
  return <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" /></svg>;
}

export function FrameworkDownloadCallout({ pdfUrl }: FrameworkDownloadCalloutProps) {
  return (
    <section aria-labelledby="full-framework-pdf" className="mt-8 max-w-4xl border border-line bg-[color-mix(in_srgb,var(--accent)_3%,transparent)] px-5 py-6 sm:px-7 sm:py-7">
      <h2 id="full-framework-pdf" className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">Full Framework PDF</h2>
      <p className="mt-4 text-sm leading-6 text-ink sm:text-[0.95rem]">The web edition presents the framework structure and the source-supported method.</p>
      <p className="mt-3 text-sm leading-6 text-muted sm:text-[0.95rem]">A complete framework PDF, including supporting material and appendices where available, will be provided with the published framework.</p>
      <div className="mt-5">
        {pdfUrl ? <a className="inline-flex min-h-10 items-center gap-2 border border-line bg-[color-mix(in_srgb,var(--accent)_10%,var(--canvas))] px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-[color-mix(in_srgb,var(--accent)_18%,var(--canvas))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas" download href={pdfUrl}><DownloadIcon />Download Full Framework PDF</a> : <span aria-disabled="true" className="inline-flex min-h-10 cursor-not-allowed items-center gap-2 border border-line px-4 py-2 text-sm font-medium text-muted"><DownloadIcon />PDF coming soon</span>}
      </div>
    </section>
  );
}
