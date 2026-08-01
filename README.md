# Aryan Singh Finance Research

Professional finance research website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

1. Install Node.js 20 or later and pnpm.
2. Open this folder in a terminal.
3. Run `pnpm install`.
4. Copy `.env.example` to `.env.local` and set your future public domain.
5. Run `pnpm dev` and open `http://localhost:3000`.

## Quality checks

- `pnpm lint` checks code quality.
- `pnpm build` creates the production version used by Vercel.

## Content updates

- Research data: `src/data/research.ts`
- Company library: `src/data/library.ts`
- PDF files should be placed in `public/research/` and linked from the corresponding research item once final publication files are available.
