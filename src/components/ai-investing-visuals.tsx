import type { ReactNode } from "react";

export type AiInvestingVisualId = "ecosystem" | "business-models" | "monetization" | "moats" | "financial-strength" | "risks" | "valuation";

function Figure({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return <figure className="mt-10 border border-line p-5 sm:p-7"><p className="text-xs font-semibold tracking-[0.14em] uppercase">Analysis visual</p><h3 className="mt-3 font-display text-xl tracking-[-0.02em] text-ink">{title}</h3><div className="mt-7 overflow-x-auto">{children}</div><figcaption className="mt-6 border-t border-line pt-4 text-sm leading-6 text-muted">{caption}<span className="mt-2 block text-xs">Source: Information presented in this article.</span></figcaption></figure>;
}

function Box({ x, y, width, height, title, lines, accent = false }: { x: number; y: number; width: number; height: number; title: string; lines: string[]; accent?: boolean }) {
  return <g><rect x={x} y={y} width={width} height={height} rx="4" fill={accent ? "var(--accent)" : "var(--canvas)"} stroke="var(--line)" /><text x={x + 16} y={y + 25} fill={accent ? "var(--canvas)" : "var(--ink)"} fontSize="13" fontWeight="600">{title}</text>{lines.map((line, index) => <text key={`${title}-line-${index}`} x={x + 16} y={y + 49 + index * 17} fill={accent ? "var(--canvas)" : "var(--muted)"} fontSize="11">{line}</text>)}</g>;
}

function EcosystemVisual() {
  return <Figure title="The AI ecosystem" caption="The AI ecosystem: from computing infrastructure to end-user applications."><svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 760 210" role="img" aria-label="AI ecosystem from hardware through applications"><defs><marker id="ecosystem-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="var(--accent)" /></marker></defs><Box x={10} y={55} width={160} height={100} title="Hardware" lines={["GPUs & AI accelerators", "NVIDIA · AMD"]} accent /><Box x={205} y={55} width={160} height={100} title="Cloud infrastructure" lines={["Microsoft Azure · AWS", "Google Cloud"]} /><Box x={400} y={55} width={160} height={100} title="Foundation models" lines={["Language and other", "foundation models"]} /><Box x={595} y={55} width={155} height={100} title="AI applications" lines={["Enterprise tools · Search", "Healthcare · Finance"]} />{[170, 365, 560].map((x, index) => <path key={`ecosystem-arrow-${index}-${x}`} d={`M ${x + 8} 105 H ${x + 28}`} stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ecosystem-arrow)" />)}<text x="10" y="25" fill="var(--muted)" fontSize="11" letterSpacing="1.4">VALUE FLOWS THROUGH CONNECTED LAYERS</text></svg></Figure>;
}

function BusinessModelsVisual() {
  const rows = [["NVIDIA", "AI computing infrastructure", "GPUs for training and inference"], ["Microsoft", "Cloud and enterprise software", "Azure, Microsoft 365, GitHub, Copilot"], ["Alphabet", "Research, platforms, and cloud", "Search, YouTube, Google Cloud, DeepMind"], ["Amazon", "Cloud infrastructure and operations", "AWS, logistics, and AI services"], ["AMD", "AI accelerators and computing", "High-performance computing challenger"]];
  return <Figure title="How the five companies participate in AI" caption="How the five companies participate in the AI value chain."><svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 760 270" role="img" aria-label="Comparison of AI roles across the five companies"><rect x="0" y="0" width="760" height="36" fill="var(--accent)" /><text x="18" y="23" fill="var(--canvas)" fontSize="11" fontWeight="600">COMPANY</text><text x="170" y="23" fill="var(--canvas)" fontSize="11" fontWeight="600">PRIMARY AI ROLE</text><text x="420" y="23" fill="var(--canvas)" fontSize="11" fontWeight="600">ARTICLE EXAMPLES</text>{rows.map((row, index) => { const y = 36 + index * 46; return <g key={`business-model-${row[0]}-${index}`}><rect x="0" y={y} width="760" height="46" fill={index % 2 ? "color-mix(in srgb, var(--accent) 4%, transparent)" : "transparent"} /><path d={`M0 ${y + 46}H760`} stroke="var(--line)" /><text x="18" y={y + 28} fill="var(--ink)" fontSize="12" fontWeight="600">{row[0]}</text><text x="170" y={y + 28} fill="var(--muted)" fontSize="11">{row[1]}</text><text x="420" y={y + 28} fill="var(--muted)" fontSize="11">{row[2]}</text></g>; })}</svg></Figure>;
}

function MonetizationVisual() {
  return <Figure title="Two routes to AI monetization" caption="Hardware and software create AI value through different economic models."><svg className="h-auto min-w-[38rem] w-full" viewBox="0 0 760 225" role="img" aria-label="Comparison of hardware and software AI monetization"><path d="M380 25V200" stroke="var(--line)" /><text x="25" y="28" fill="var(--accent)" fontSize="11" fontWeight="600" letterSpacing="1.2">HARDWARE-LED</text><text x="405" y="28" fill="var(--accent)" fontSize="11" fontWeight="600" letterSpacing="1.2">SOFTWARE AND CLOUD-LED</text><Box x={25} y={50} width={315} height={52} title="AI infrastructure" lines={["GPUs and accelerators for training and inference"]} accent /><Box x={25} y={132} width={315} height={52} title="Companies discussed" lines={["NVIDIA and AMD"]} /><Box x={405} y={50} width={315} height={52} title="AI-enabled services" lines={["Cloud capacity, enterprise software, and platforms"]} accent /><Box x={405} y={132} width={315} height={52} title="Companies discussed" lines={["Microsoft, Alphabet, and Amazon"]} /></svg></Figure>;
}

function MoatsVisual() {
  const rows = [["NVIDIA", "CUDA, ecosystem, switching costs"], ["Microsoft", "Enterprise relationships, ecosystem, switching costs"], ["Alphabet", "Data, network effects, AI research"], ["Amazon", "AWS ecosystem, scale, operational capabilities"], ["AMD", "Innovation and AI-hardware challenger position"]];
  return <Figure title="Sources of competitive advantage" caption="Comparing the sources of competitive advantage across the AI ecosystem."><svg className="h-auto min-w-[38rem] w-full" viewBox="0 0 760 245" role="img" aria-label="Competitive advantage comparison"><text x="16" y="18" fill="var(--muted)" fontSize="11" letterSpacing="1.2">COMPANY</text><text x="220" y="18" fill="var(--muted)" fontSize="11" letterSpacing="1.2">PRIMARY ADVANTAGES DISCUSSED IN THE ARTICLE</text>{rows.map((row, index) => { const y = 34 + index * 40; return <g key={`moat-${row[0]}-${index}`}><rect x="0" y={y} width="760" height="40" fill={index % 2 ? "color-mix(in srgb, var(--accent) 4%, transparent)" : "transparent"} /><rect x="16" y={y + 12} width="8" height="8" fill="var(--accent)" /><text x="42" y={y + 26} fill="var(--ink)" fontSize="12" fontWeight="600">{row[0]}</text><text x="220" y={y + 26} fill="var(--muted)" fontSize="12">{row[1]}</text></g>; })}</svg></Figure>;
}

function ComparisonTableVisual({ type }: { type: "financial" | "risks" | "valuation" }) {
  const data = type === "financial" ? { title: "Financial strength comparison", caption: "Financial strength comparison across the five companies.", headers: ["Company", "Revenue growth", "Profitability", "Cash flow", "Balance sheet", "Overall score"], rows: [["NVIDIA", "Excellent", "Excellent", "Excellent", "Excellent", "9.8/10"], ["Microsoft", "Excellent", "Excellent", "Excellent", "Excellent", "9.7/10"], ["Alphabet", "Excellent", "Very Strong", "Excellent", "Excellent", "9.5/10"], ["Amazon", "Very Strong", "Strong", "Very Strong", "Strong", "9.2/10"], ["AMD", "Strong", "Good", "Good", "Strong", "8.8/10"]] } : type === "risks" ? { title: "Risk comparison", caption: "Relative risk exposures across the five AI companies.", headers: ["Company", "Competition", "Regulation", "Valuation", "Financial risk", "Overall risk"], rows: [["NVIDIA", "Medium", "Medium", "High", "Low", "Medium"], ["Microsoft", "Medium", "Medium", "Medium", "Low", "Low"], ["Alphabet", "High", "High", "Medium", "Low", "Medium"], ["Amazon", "High", "Medium", "Medium", "Low", "Medium"], ["AMD", "High", "Low", "Medium", "Medium", "Medium-High"]] } : { title: "Quality and valuation", caption: "Business quality and valuation: a qualitative comparison.", headers: ["Company", "Valuation view", "Investment opinion"], rows: [["NVIDIA", "Expensive, but supported by exceptional growth", "Premium justified"], ["Microsoft", "Fairly valued", "High-quality long-term investment"], ["Alphabet", "Attractive valuation", "Best value among the group"], ["Amazon", "Slightly expensive", "Fair price for a strong business"], ["AMD", "Fair but dependent on future execution", "High-risk, high-reward opportunity"]] };
  const widths = data.headers.length === 3 ? [130, 370, 260] : [125, 125, 125, 125, 125, 135];
  return <Figure title={data.title} caption={data.caption}><svg className="h-auto min-w-[44rem] w-full" viewBox={`0 0 760 ${36 + data.rows.length * 48}`} role="img" aria-label={data.title}><rect x="0" y="0" width="760" height="36" fill="var(--accent)" />{data.headers.map((header, index) => <text key={`${type}-header-${header}-${index}`} x={widths.slice(0, index).reduce((sum, width) => sum + width, 14)} y="23" fill="var(--canvas)" fontSize="10" fontWeight="600">{header.toUpperCase()}</text>)}{data.rows.map((row, rowIndex) => { const y = 36 + rowIndex * 48; return <g key={`${type}-row-${row[0]}-${rowIndex}`}><rect x="0" y={y} width="760" height="48" fill={rowIndex % 2 ? "color-mix(in srgb, var(--accent) 4%, transparent)" : "transparent"} />{row.map((cell, index) => <text key={`${type}-cell-${row[0]}-${data.headers[index]}-${index}`} x={widths.slice(0, index).reduce((sum, width) => sum + width, 14)} y={y + 22} fill={index === 0 ? "var(--ink)" : "var(--muted)"} fontSize={index === 0 ? 11 : 10} fontWeight={index === 0 ? "600" : "400"}>{cell}</text>)}</g>; })}</svg></Figure>;
}

export function AiInvestingVisual({ id }: { id: AiInvestingVisualId }) {
  if (id === "ecosystem") return <EcosystemVisual />;
  if (id === "business-models") return <BusinessModelsVisual />;
  if (id === "monetization") return <MonetizationVisual />;
  if (id === "moats") return <MoatsVisual />;
  if (id === "financial-strength") return <ComparisonTableVisual type="financial" />;
  if (id === "risks") return <ComparisonTableVisual type="risks" />;
  return <ComparisonTableVisual type="valuation" />;
}

export const essentialVisualSections: { heading: string; id: AiInvestingVisualId }[] = [
  { heading: "The Current AI Market", id: "ecosystem" },
  { heading: "Business Model Analysis", id: "business-models" },
  { heading: "Software vs Hardware: Two Different Roads", id: "monetization" },
  { heading: "Comparing the Competitive Advantages", id: "moats" },
  { heading: "Comparing Financial Strength", id: "financial-strength" },
  { heading: "Risk Comparison Table", id: "risks" },
  { heading: "Which Company Looks Most Attractive?", id: "valuation" },
];
