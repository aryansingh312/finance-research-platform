import { useId } from "react";
import type { FrameworkBlock, FrameworkTable, FrameworkVisual } from "@/data/frameworks";

function words(text: string, limit = 29): string[] {
  return text.split(/\s+/).reduce<string[]>((lines, word) => {
    if (!lines.length || `${lines.at(-1)} ${word}`.length > limit) lines.push(word);
    else lines[lines.length - 1] += ` ${word}`;
    return lines;
  }, []);
}

function Label({ text, x, y, limit = 29 }: { text: string; x: number; y: number; limit?: number }) {
  const lines = words(text, limit);
  return <text x={x} y={y} textAnchor="middle" fill="var(--ink)" fontSize="16" fontWeight="500">{lines.map((line, i) => <tspan key={i} x={x} dy={i ? 21 : 0}>{line}</tspan>)}</text>;
}

function SourceTable({ table }: { table: FrameworkTable }) {
  return <div role="region" aria-label={table.caption ?? "Framework table"} tabIndex={0} className="my-8 overflow-x-auto border border-line focus-visible:outline-2 focus-visible:outline-accent"><table className="w-full min-w-[32rem] text-left text-sm leading-6"><caption className="caption-top px-5 py-4 text-left text-sm text-muted">{table.caption}</caption><thead className="border-y border-line bg-[color-mix(in_srgb,var(--accent)_5%,transparent)]"><tr>{table.headers.map((header, i) => <th key={i} scope="col" className="px-5 py-3 font-semibold">{header}</th>)}</tr></thead><tbody>{table.rows.map((row, i) => <tr key={i} className="border-b border-line last:border-0">{row.map((cell, j) => j === 0 ? <th key={j} scope="row" className="px-5 py-4 align-top font-medium">{cell}</th> : <td key={j} className="px-5 py-4 align-top text-muted">{cell}</td>)}</tr>)}</tbody></table></div>;
}

function Diagram({ diagram }: { diagram: FrameworkVisual }) {
  const id = useId().replace(/:/g, "");
  if (diagram.kind === "triangle") return <figure className="my-10 border border-line p-4 sm:p-7"><h3 className="font-display text-2xl">{diagram.title}</h3><svg viewBox="0 0 360 350" role="img" aria-labelledby={`${id}-title ${id}-desc`} className="mx-auto my-6 h-auto w-full max-w-[25rem]"><title id={`${id}-title`}>{diagram.title}</title><desc id={`${id}-desc`}>{diagram.caption}</desc><path d="M180 100 L90 230 L270 230 Z" fill="none" stroke="var(--accent)" strokeWidth="1.5" />{diagram.nodes.map((node, i) => { const x = i === 0 ? 180 : i === 1 ? 90 : 270; const y = i === 0 ? 12 : 230; return <g key={node.id}><rect x={x - 80} y={y} width="160" height="110" fill="var(--canvas)" stroke="var(--accent)" /><Label text={node.label} x={x} y={y + 24} limit={17} /></g>; })}</svg><figcaption className="border-t border-line pt-4 text-sm leading-6 text-muted">{diagram.caption}</figcaption></figure>;
  const decision = diagram.kind === "decision";
  const pyramid = diagram.kind === "pyramid";
  const matrix = diagram.kind === "matrix";
  const nodes = pyramid ? [...diagram.nodes].reverse() : diagram.nodes;
  const step = decision ? 176 : 112;
  const height = nodes.length * step + (diagram.finalOutcome ? 90 : 12);
  return <figure className="my-10 border border-line p-4 sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Framework visual</p><h3 className="mt-3 font-display text-2xl tracking-[-0.025em]">{diagram.title}</h3><svg viewBox={`0 0 360 ${height}`} className="mx-auto my-6 block h-auto w-full max-w-[25rem]" role="img" aria-labelledby={`${id}-title ${id}-desc`}><title id={`${id}-title`}>{diagram.title}</title><desc id={`${id}-desc`}>{diagram.caption} {nodes.map((node) => `${node.label}${node.outcome ? `: ${diagram.branchLabel} — ${node.outcome}` : ""}`).join(". ")}</desc><defs><marker id={`${id}-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>{nodes.map((node, i) => {
    const y = i * step + 10;
    const width = pyramid ? 238 + i * (96 / Math.max(1, nodes.length - 1)) : 318;
    const x = (360 - width) / 2;
    const boxHeight = decision ? 130 : 86;
    return <g key={node.id}><rect x={x} y={y} width={width} height={boxHeight} rx="2" fill="var(--canvas)" stroke="var(--accent)" strokeOpacity="0.65" /><Label text={node.label} x={180} y={y + (decision ? 27 : 29)} limit={pyramid ? 26 : 29} />{node.outcome ? <><line x1={x + 14} x2={x + width - 14} y1={y + 60} y2={y + 60} stroke="var(--line)" /><Label text={`${diagram.branchLabel} → ${node.outcome}`} x={180} y={y + 86} /></> : null}{(i < nodes.length - 1 || diagram.finalOutcome) && !matrix && !pyramid ? <><line x1="180" x2="180" y1={y + boxHeight + 3} y2={y + step - 5} stroke="var(--accent)" markerEnd={`url(#${id}-arrow)`} />{decision ? <text x="193" y={y + boxHeight + 26} fontSize="12" fill="var(--muted)">{diagram.continuation}</text> : null}</> : null}</g>;
  })}{diagram.finalOutcome ? <Label text={diagram.finalOutcome} x={180} y={nodes.length * step + 24} /> : null}{diagram.kind === "cycle" ? <path d={`M340,${nodes.length * step - 56} L350,${nodes.length * step - 56} L350,52 L341,52`} fill="none" stroke="var(--accent)" strokeDasharray="4 4" markerEnd={`url(#${id}-arrow)`} /> : null}</svg><figcaption className="border-t border-line pt-4 text-sm leading-6 text-muted">{diagram.caption}</figcaption></figure>;
}

export function FrameworkBlocks({ blocks }: { blocks: FrameworkBlock[] }) {
  return <div className="mt-6">{blocks.map((block, i) => {
    switch (block.type) {
      case "paragraph": return <p key={i} className="mt-5 text-[1.05rem] leading-8 text-muted sm:text-lg">{block.text}</p>;
      case "heading": return <h3 key={i} className="mt-9 font-display text-xl tracking-[-0.02em] sm:text-2xl">{block.text}</h3>;
      case "list": return <ul key={i} className="mt-5 space-y-2 border-l border-line pl-5 text-[1.05rem] leading-7 text-muted">{block.items.map((item, j) => <li key={j}>{item}</li>)}</ul>;
      case "table": return <SourceTable key={i} table={block.table} />;
      case "diagram": return <Diagram key={i} diagram={block.diagram} />;
    }
  })}</div>;
}
