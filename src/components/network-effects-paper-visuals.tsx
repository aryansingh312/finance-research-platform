import type { ReactNode } from "react";

export type NetworkEffectsVisualId = "network-flywheel" | "network-types" | "sustainable-advantage";

function Frame({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return <figure className="mt-10 border border-line p-5 sm:p-7">
    <p className="text-xs font-semibold tracking-[0.14em] uppercase">Research visual</p>
    <h3 className="mt-3 font-display text-xl tracking-[-0.02em] text-ink">{title}</h3>
    <div className="mt-7 overflow-x-auto">{children}</div>
    <figcaption className="mt-6 border-t border-line pt-4 text-sm leading-6 text-muted">{caption}<span className="mt-2 block text-xs">Source: Author’s framework in this paper.</span></figcaption>
  </figure>;
}

function Flywheel() {
  const steps = ["Participation", "Contribution", "Improvement", "Attraction"];
  return <Frame title="The network flywheel" caption="The theory chapter describes four stages: participants contribute value, the network improves, and that improvement attracts further participation.">
    <svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 760 220" role="img" aria-label="Participation leads to contribution, improvement, attraction, and renewed participation">
      <defs><marker id="network-flywheel-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L0 6 L6 3z" fill="var(--accent)" /></marker></defs>
      {steps.map((step, index) => { const x = 18 + index * 187; return <g key={step}><rect x={x} y="72" width="165" height="66" rx="4" fill={index === 0 ? "var(--accent)" : "var(--canvas)"} stroke="var(--line)" /><text x={x + 82.5} y="111" textAnchor="middle" fill={index === 0 ? "var(--canvas)" : "var(--ink)"} fontSize="13" fontWeight="600">{step}</text></g>; })}
      {[183, 370, 557].map((x) => <path key={x} d={`M ${x} 105 H ${x + 20}`} fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#network-flywheel-arrow)" />)}
      <path d="M 670 145 C 650 207, 112 207, 100 145" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#network-flywheel-arrow)" />
    </svg>
  </Frame>;
}

function NetworkTypes() {
  return <Frame title="Direct and indirect network effects" caption="Direct effects raise value through participation among similar users; indirect effects arise when growth on one side increases value for another side.">
    <svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 760 260" role="img" aria-label="Direct networks connect users to other users, while indirect networks connect participant groups across sides">
      <rect x="20" y="20" width="345" height="215" rx="4" fill="var(--canvas)" stroke="var(--line)" />
      <rect x="395" y="20" width="345" height="215" rx="4" fill="var(--canvas)" stroke="var(--line)" />
      <text x="192" y="54" textAnchor="middle" fill="var(--accent)" fontSize="14" fontWeight="700">DIRECT</text>
      <text x="567" y="54" textAnchor="middle" fill="var(--accent)" fontSize="14" fontWeight="700">INDIRECT</text>
      <path d="M 114 139 H 270 M 192 92 V 185" stroke="var(--accent)" strokeWidth="2" />
      {[[114, 139], [270, 139], [192, 92], [192, 185]].map(([x, y], index) => <g key={index}><circle cx={x} cy={y} r="22" fill={index === 0 ? "var(--accent)" : "var(--canvas)"} stroke="var(--accent)" /><text x={x} y={y + 4} textAnchor="middle" fill={index === 0 ? "var(--canvas)" : "var(--ink)"} fontSize="10">User</text></g>)}
      <path d="M 492 139 H 642" stroke="var(--accent)" strokeWidth="2" />
      <path d="M 642 148 H 492" stroke="var(--accent)" strokeWidth="2" />
      <rect x="425" y="109" width="112" height="70" rx="4" fill="var(--accent)" />
      <rect x="602" y="109" width="112" height="70" rx="4" fill="var(--canvas)" stroke="var(--accent)" />
      <text x="481" y="151" textAnchor="middle" fill="var(--canvas)" fontSize="12" fontWeight="600">Side A</text>
      <text x="658" y="151" textAnchor="middle" fill="var(--ink)" fontSize="12" fontWeight="600">Side B</text>
    </svg>
  </Frame>;
}

function SustainableAdvantage() {
  const dimensions = [
    ["Contribution", "Added participation creates value"],
    ["Depth", "Embedded in behaviour or infrastructure"],
    ["Reinforcement", "Other advantages strengthen the network"],
    ["Value capture", "Economics without damaging participation"],
    ["Adaptability", "Relevance through change"],
  ];
  return <Frame title="Sustainable Network Advantage Model" caption="The conclusion presents these five elements as an intentionally multiplicative conceptual model, not a numerical scoring formula.">
    <svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 760 390" role="img" aria-label="Five elements of sustainable network advantage: contribution, depth, reinforcement, value capture, and adaptability">
      {dimensions.map(([label, meaning], index) => { const y = 12 + index * 74; return <g key={label}><rect x="15" y={y} width="730" height="62" rx="4" fill={index === 0 ? "var(--accent)" : "var(--canvas)"} stroke="var(--line)" /><text x="37" y={y + 26} fill={index === 0 ? "var(--canvas)" : "var(--accent)"} fontSize="13" fontWeight="700">{label}</text><text x="37" y={y + 47} fill={index === 0 ? "var(--canvas)" : "var(--muted)"} fontSize="11.5">{meaning}</text></g>; })}
    </svg>
  </Frame>;
}

export function NetworkEffectsVisual({ id }: { id: NetworkEffectsVisualId }) {
  if (id === "network-flywheel") return <Flywheel />;
  if (id === "network-types") return <NetworkTypes />;
  return <SustainableAdvantage />;
}

export const networkEffectsVisualSections: { heading: string; id: NetworkEffectsVisualId }[] = [
  { heading: "The Network Flywheel", id: "network-flywheel" },
  { heading: "Comparing the Main Types", id: "network-types" },
  { heading: "The Sustainable Network Advantage Model", id: "sustainable-advantage" },
];
