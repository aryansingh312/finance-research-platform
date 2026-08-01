type PageIntroProps = { eyebrow: string; title: string; description: string };

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="border-b border-line py-16 sm:py-24">
      <p className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">{eyebrow}</p>
      <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight tracking-[-0.04em] sm:text-6xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p>
    </section>
  );
}
