import type { ReactNode } from "react";

export type BehavioralBiasesVisualId = "bias-framework" | "bias-chain" | "case-studies" | "two-lenses" | "market-cycle" | "reflection-checklist";

function Frame({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return <figure className="mt-10 border border-line p-5 sm:p-7"><p className="text-xs font-semibold tracking-[0.14em] uppercase">Analysis visual</p><h3 className="mt-3 font-display text-xl tracking-[-0.02em] text-ink">{title}</h3><div className="mt-7 overflow-x-auto">{children}</div><figcaption className="mt-6 border-t border-line pt-4 text-sm leading-6 text-muted">{caption}<span className="mt-2 block text-xs">Source: Information presented in this article.</span></figcaption></figure>;
}

function BiasFramework() {
  const labels = ["Confirmation bias", "Overconfidence", "Herd behavior", "Anchoring", "Loss aversion", "FOMO"];
  return <Frame title="Behavioral bias interaction framework" caption="The paper explains that behavioral biases rarely occur alone; they reinforce one another during investment decisions."><svg className="h-auto min-w-[48rem] w-full" viewBox="0 0 840 230" role="img" aria-label="Interacting behavioral biases"><defs><marker id="behavioral-framework-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L0 6 L6 3z" fill="var(--accent)" /></marker></defs>{labels.map((label, index) => { const x = 30 + (index % 3) * 270; const y = index < 3 ? 30 : 145; const fill = index === 1 ? "var(--accent)" : "var(--canvas)"; const color = index === 1 ? "var(--canvas)" : "var(--ink)"; return <g key={`framework-node-${index}-${label}`}><rect x={x} y={y} width="180" height="52" rx="4" fill={fill} stroke="var(--line)" /><text x={x + 90} y={y + 31} textAnchor="middle" fill={color} fontSize="12" fontWeight="600">{label}</text></g>; })}{[[210,56,300,56],[480,56,570,56],[390,82,300,145],[660,82,660,145],[750,171,660,171]].map((edge, index) => <path key={`framework-edge-${index}`} d={`M ${edge[0]} ${edge[1]} L ${edge[2]} ${edge[3]}`} fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#behavioral-framework-arrow)" />)}</svg></Frame>;
}

function BiasChain() {
  const steps = ["Excitement", "Confirmation bias", "Overconfidence", "Herd behavior", "FOMO", "Loss aversion and anchoring"];
  return <Frame title="Investor bias chain" caption="The recurring pattern described in the case studies shows how one bias can quietly introduce the next."><svg className="h-auto min-w-[52rem] w-full" viewBox="0 0 930 160" role="img" aria-label="Investor bias chain"><defs><marker id="behavioral-chain-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L0 6 L6 3z" fill="var(--accent)" /></marker></defs>{steps.map((step, index) => { const x = 10 + index * 152; const fill = index === 0 ? "var(--accent)" : "var(--canvas)"; const color = index === 0 ? "var(--canvas)" : "var(--ink)"; return <g key={`chain-step-${index}`}><rect x={x} y="48" width="126" height="58" rx="4" fill={fill} stroke="var(--line)" /><text x={x + 63} y="82" textAnchor="middle" fill={color} fontSize="10.5" fontWeight="600">{step}</text></g>; })}{[136,288,440,592,744].map((x,index) => <path key={`chain-arrow-${index}`} d={`M ${x} 77 H ${x + 18}`} fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#behavioral-chain-arrow)" />)}</svg></Frame>;
}

function CaseStudies() {
  const rows = [["Dot-com Bubble", "Herd mentality / Confirmation bias / FOMO"], ["2008 Financial Crisis", "Overconfidence / Loss aversion / Recency bias"], ["GameStop", "Herd behavior / FOMO / Overconfidence"], ["AI Boom", "Confirmation bias / Availability bias / Herd behavior / FOMO"]];
  return <Frame title="Four case studies by bias matrix" caption="The paper compares recurring behavioral biases across the Dot-com Bubble, the Global Financial Crisis, GameStop, and the AI investment boom."><svg className="h-auto min-w-[48rem] w-full" viewBox="0 0 820 250" role="img" aria-label="Matrix comparing case studies and behavioral biases"><rect width="820" height="42" fill="var(--accent)" /><text x="22" y="26" fill="var(--canvas)" fontSize="11" fontWeight="600">CASE STUDY</text><text x="260" y="26" fill="var(--canvas)" fontSize="11" fontWeight="600">MAIN BIASES IDENTIFIED IN THE PAPER</text>{rows.map((row,index) => { const y = 42 + index * 52; const fill = index % 2 === 0 ? "transparent" : "color-mix(in srgb, var(--accent) 4%, transparent)"; return <g key={`case-row-${index}-${row[0]}`}><rect y={y} width="820" height="52" fill={fill} /><text x="22" y={y + 31} fill="var(--ink)" fontSize="12" fontWeight="600">{row[0]}</text><text x="260" y={y + 31} fill="var(--muted)" fontSize="11.5">{row[1]}</text></g>; })}</svg></Frame>;
}

function TwoLenses() {
  return <Frame title="Traditional finance vs behavioral finance" caption="The paper presents the two approaches as complementary: one studies the business, while the other studies the people pricing it."><svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 760 250" role="img" aria-label="Complementary traditional and behavioral finance lenses"><rect x="40" y="45" width="280" height="150" rx="4" fill="var(--canvas)" stroke="var(--line)" /><rect x="440" y="45" width="280" height="150" rx="4" fill="var(--canvas)" stroke="var(--line)" /><path d="M 320 120 H 440" fill="none" stroke="var(--accent)" strokeWidth="1.5" /><circle cx="380" cy="120" r="30" fill="var(--accent)" /><text x="380" y="124" textAnchor="middle" fill="var(--canvas)" fontSize="11" fontWeight="600">BOTH</text><text x="180" y="76" textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="600">TRADITIONAL FINANCE</text><text x="180" y="112" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="600">What is the business worth?</text><text x="180" y="142" textAnchor="middle" fill="var(--muted)" fontSize="12">Revenue / margins / cash flow</text><text x="580" y="76" textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="600">BEHAVIORAL FINANCE</text><text x="580" y="112" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="600">Why may the market disagree?</text><text x="580" y="142" textAnchor="middle" fill="var(--muted)" fontSize="12">Expectations / fear / optimism</text></svg></Frame>;
}

function MarketCycle() {
  const stages = [[70,110,"Legitimate opportunity"],[215,42,"Optimism"],[350,20,"Certainty"],[500,42,"Speculation"],[640,110,"Reality"]] as const;
  return <Frame title="Recurring market cycle" caption="Across the case studies, a legitimate opportunity can progress from optimism to speculation before reality catches up."><svg className="h-auto min-w-[44rem] w-full" viewBox="0 0 790 230" role="img" aria-label="Recurring market cycle"><defs><marker id="behavioral-cycle-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L0 6 L6 3z" fill="var(--accent)" /></marker></defs><path d="M 170 135 C 260 12, 540 12, 640 135" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#behavioral-cycle-arrow)" /><path d="M 640 135 C 540 212, 260 212, 170 135" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#behavioral-cycle-arrow)" />{stages.map(([x,y,label],index) => { const fill = index === 2 ? "var(--accent)" : "var(--canvas)"; const color = index === 2 ? "var(--canvas)" : "var(--ink)"; return <g key={`cycle-stage-${index}`}><rect x={x} y={y} width="100" height="50" rx="4" fill={fill} stroke="var(--line)" /><text x={x + 50} y={y + 30} textAnchor="middle" fill={color} fontSize="10.5" fontWeight="600">{label}</text></g>; })}</svg></Frame>;
}

function ReflectionChecklist() {
  const prompts = ["Why am I buying this?", "What evidence would prove me wrong?", "Am I reacting to facts or emotions?"];
  return <Frame title="Pre-investment reflection checklist" caption="The practical recommendations encourage investors to examine their reasoning before making an investment decision."><svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 760 245" role="img" aria-label="Pre-investment reflection checklist">{prompts.map((prompt,index) => { const y = 24 + index * 70; const fill = index === 0 ? "var(--accent)" : "var(--canvas)"; const color = index === 0 ? "var(--canvas)" : "var(--ink)"; return <g key={`reflection-${index}`}><rect x="35" y={y} width="690" height="52" rx="4" fill={fill} stroke="var(--line)" /><circle cx="66" cy={y + 26} r="12" fill={index === 0 ? "var(--canvas)" : "var(--accent)"} /><text x="66" y={y + 30} textAnchor="middle" fill={index === 0 ? "var(--accent)" : "var(--canvas)"} fontSize="11" fontWeight="600">{index + 1}</text><text x="94" y={y + 31} fill={color} fontSize="13" fontWeight="600">{prompt}</text></g>; })}</svg></Frame>;
}

export function BehavioralBiasesVisual({ id }: { id: BehavioralBiasesVisualId }) {
  if (id === "bias-framework") return <BiasFramework />;
  if (id === "bias-chain") return <BiasChain />;
  if (id === "case-studies") return <CaseStudies />;
  if (id === "two-lenses") return <TwoLenses />;
  if (id === "market-cycle") return <MarketCycle />;
  return <ReflectionChecklist />;
}

export const behavioralBiasesVisualSections: { heading: string; id: BehavioralBiasesVisualId }[] = [
  { heading: "3.10 Behavioral Bias Framework", id: "bias-framework" },
  { heading: "4.6 Comparative Analysis of the Case Studies", id: "case-studies" },
  { heading: "4.7 Recurring Patterns", id: "bias-chain" },
  { heading: "4.8 Traditional Finance vs Behavioral Finance", id: "two-lenses" },
  { heading: "4.10 Discussion", id: "market-cycle" },
  { heading: "Recommendations for Individual Investors", id: "reflection-checklist" }
];
