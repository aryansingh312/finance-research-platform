import type { ReactNode } from "react";

export type CompetitiveMoatsVisualId = "moat-loop" | "company-matrix" | "investor-flow" | "moat-compass" | "ai-amplifier";

function Frame({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return <figure className="mt-10 border border-line p-5 sm:p-7"><p className="text-xs font-semibold tracking-[0.14em] uppercase">Analysis visual</p><h3 className="mt-3 font-display text-xl tracking-[-0.02em] text-ink">{title}</h3><div className="mt-7 overflow-x-auto">{children}</div><figcaption className="mt-6 border-t border-line pt-4 text-sm leading-6 text-muted">{caption}<span className="mt-2 block text-xs">Source: Information presented in this article.</span></figcaption></figure>;
}

function Loop() {
  const nodes = [{ x: 310, y: 12, text: "Network effects" }, { x: 535, y: 92, text: "Brand" }, { x: 535, y: 250, text: "Customer loyalty" }, { x: 310, y: 330, text: "More data" }, { x: 85, y: 250, text: "Better products" }, { x: 85, y: 92, text: "More customers" }];
  return <Frame title="Reinforcing moats loop" caption="Individual advantages become a self-improving system when they reinforce one another."><svg className="h-auto min-w-[38rem] w-full" viewBox="0 0 760 410" role="img" aria-label="Loop showing reinforcing economic moats"><defs><marker id="moat-loop-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="var(--accent)" /></marker></defs>{nodes.map((node, index) => <g key={`loop-node-${index}-${node.text}`}><rect x={node.x} y={node.y} width="140" height="52" rx="4" fill={index === 0 ? "var(--accent)" : "var(--canvas)"} stroke="var(--line)" /><text x={node.x + 70} y={node.y + 31} textAnchor="middle" fill={index === 0 ? "var(--canvas)" : "var(--ink)"} fontSize="12" fontWeight="600">{node.text}</text></g>)}{[[380,64,535,118],[675,144,675,250],[535,302,450,356],[310,356,225,302],[85,250,85,144],[225,118,310,64]].map((edge,index) => <path key={`loop-edge-${index}`} d={`M ${edge[0]} ${edge[1]} L ${edge[2]} ${edge[3]}`} stroke="var(--accent)" strokeWidth="1.5" fill="none" markerEnd="url(#moat-loop-arrow)" />)}</svg></Frame>;
}

function Matrix() {
  const rows = [["Microsoft", "Switching costs · Ecosystem"], ["NVIDIA", "Software reinforcing hardware"], ["Alphabet", "Data reinforcing product quality"], ["Amazon", "Scale · Logistics · Operations"], ["Visa & Mastercard", "Trust · Global acceptance"]];
  return <Frame title="Company × moat matrix" caption="The case studies show that companies build durable advantage through different combinations of moats."><svg className="h-auto min-w-[38rem] w-full" viewBox="0 0 760 270" role="img" aria-label="Company and economic moat matrix"><rect width="760" height="38" fill="var(--accent)" /><text x="20" y="24" fill="var(--canvas)" fontSize="11" fontWeight="600">COMPANY</text><text x="260" y="24" fill="var(--canvas)" fontSize="11" fontWeight="600">ADVANTAGES DISCUSSED IN THE ARTICLE</text>{rows.map((row,index) => { const y=38+index*46; return <g key={`matrix-row-${row[0]}-${index}`}><rect x="0" y={y} width="760" height="46" fill={index%2 ? "color-mix(in srgb, var(--accent) 4%, transparent)" : "transparent"}/><text x="20" y={y+28} fill="var(--ink)" fontSize="12" fontWeight="600">{row[0]}</text><text x="260" y={y+28} fill="var(--muted)" fontSize="12">{row[1]}</text></g>; })}</svg></Frame>;
}

function InvestorFlow() {
  const steps=["Understand\nthe business","Identify competitive\nadvantages","Test whether they\nappear durable","Examine financial\nperformance","Consider\nvaluation"];
  return <Frame title="Investor decision flow" caption="The research proposes evaluating business quality before financial performance and valuation."><svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 760 180" role="img" aria-label="Investor decision flow from business understanding to valuation"><defs><marker id="investor-flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="var(--accent)" /></marker></defs>{steps.map((step,index) => { const x=8+index*151; return <g key={`investor-step-${index}`}><rect x={x} y="52" width="126" height="68" rx="4" fill={index===0 ? "var(--accent)" : "var(--canvas)"} stroke="var(--line)" />{step.split("\n").map((line,lineIndex)=><text key={`investor-step-${index}-line-${lineIndex}`} x={x+63} y={80+lineIndex*16} textAnchor="middle" fill={index===0 ? "var(--canvas)" : "var(--ink)"} fontSize="11" fontWeight="600">{line}</text>)}</g>; })}{[134,285,436,587].map((x,index)=><path key={`investor-edge-${index}`} d={`M ${x} 86 H ${x+18}`} stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#investor-flow-arrow)" />)}</svg></Frame>;
}

function Compass() {
  const points: [number, number, string, string, string][] = [[380,42,"North","Strength","How difficult is replication?"],[646,210,"East","Durability","Will it exist in ten years?"],[380,378,"South","Adaptability","Can the business evolve?"],[114,210,"West","Management","Is leadership widening the moat?"]];
  return <Frame title="The Moat Compass" caption="A four-direction framework for testing the strength, durability, adaptability, and management of a competitive advantage."><svg className="h-auto min-w-[38rem] w-full" viewBox="0 0 760 420" role="img" aria-label="The Moat Compass framework"><circle cx="380" cy="210" r="92" fill="color-mix(in srgb, var(--accent) 8%, transparent)" stroke="var(--accent)" /><path d="M380 72V348M242 210H518" stroke="var(--accent)" strokeWidth="1.5" /><circle cx="380" cy="210" r="30" fill="var(--accent)" /><text x="380" y="214" textAnchor="middle" fill="var(--canvas)" fontSize="11" fontWeight="600">MOAT</text>{points.map((point,index)=><g key={`compass-point-${index}-${point[1]}`}><text x={point[0]} y={point[1]} textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="600">{point[2]} — {point[3]}</text><text x={point[0]} y={point[1]+19} textAnchor="middle" fill="var(--muted)" fontSize="11">{point[4]}</text></g>)}</svg></Frame>;
}

function Amplifier() {
  const foundations=["High-quality data","Strong infrastructure","Disciplined management"];
  return <Frame title="AI as an amplifier" caption="The article argues that AI strengthens existing foundations rather than rescuing businesses without them."><svg className="h-auto min-w-[38rem] w-full" viewBox="0 0 760 245" role="img" aria-label="AI strengthens business foundations"><defs><marker id="amplifier-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="var(--accent)" /></marker></defs>{foundations.map((item,index)=>{const x=30+index*180; return <g key={`foundation-${index}`}><rect x={x} y="44" width="150" height="58" rx="4" fill="var(--canvas)" stroke="var(--line)"/><text x={x+75} y="78" textAnchor="middle" fill="var(--ink)" fontSize="12" fontWeight="600">{item}</text><path d={`M ${x+75} 102 V 142`} stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#amplifier-arrow)"/></g>;})}<rect x="210" y="150" width="340" height="58" rx="4" fill="var(--accent)"/><text x="380" y="174" textAnchor="middle" fill="var(--canvas)" fontSize="13" fontWeight="600">Artificial intelligence</text><text x="380" y="193" textAnchor="middle" fill="var(--canvas)" fontSize="11">strengthens strategy; it does not replace it</text></svg></Frame>;
}

export function CompetitiveMoatsVisual({ id }: { id: CompetitiveMoatsVisualId }) {
  if (id === "moat-loop") return <Loop />;
  if (id === "company-matrix") return <Matrix />;
  if (id === "investor-flow") return <InvestorFlow />;
  if (id === "moat-compass") return <Compass />;
  return <Amplifier />;
}

export const competitiveMoatsVisualSections: { heading: string; id: CompetitiveMoatsVisualId }[] = [
  { heading: "Recap of the Project", id: "moat-loop" },
  { heading: "Major Findings", id: "company-matrix" },
  { heading: "Major Findings", id: "ai-amplifier" },
  { heading: "Practical Use for Investors", id: "investor-flow" },
  { heading: "The Moat Compass", id: "moat-compass" },
];
