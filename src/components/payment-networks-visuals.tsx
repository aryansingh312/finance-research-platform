import type { ReactNode } from "react";

export type PaymentNetworksVisualId =
  | "evolution-timeline"
  | "four-party-network"
  | "transaction-flow"
  | "business-models"
  | "network-snowball"
  | "risk-map"
  | "future-rails"
  | "investor-checklist";

function Frame({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return (
    <figure className="mt-10 border border-line p-5 sm:p-7">
      <p className="text-xs font-semibold tracking-[0.14em] uppercase">Analysis visual</p>
      <h3 className="mt-3 font-display text-xl tracking-[-0.02em] text-ink">{title}</h3>
      <div className="mt-7 overflow-x-auto">{children}</div>
      <figcaption className="mt-6 border-t border-line pt-4 text-sm leading-6 text-muted">
        {caption}
        <span className="mt-2 block text-xs">Source: Information presented in this article.</span>
      </figcaption>
    </figure>
  );
}

const textStyle = { fill: "var(--ink)", fontSize: 12 };
const mutedTextStyle = { fill: "var(--muted)", fontSize: 11 };

function EvolutionTimeline() {
  const stages = [
    ["Cash", "Universal, but physical"],
    ["Checks", "A step forward, but slow"],
    ["Credit cards", "Purchase separated from payment"],
    ["Global networks", "Common standards across institutions"],
    ["Digital payments", "Cards, wallets, and embedded commerce"],
  ];
  return <Frame title="Evolution of payment networks" caption="The evolution from local cash exchange to global payment networks."><svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 850 245" role="img" aria-label="Timeline showing the evolution of payment networks"><path d="M75 104 H775" stroke="var(--accent)" strokeWidth="2" />{stages.map(([title, detail], index) => { const x = 75 + index * 175; return <g key={"timeline-" + title}><circle cx={x} cy="104" r="10" fill="var(--accent)" /><rect x={x - 68} y="130" width="136" height="76" rx="4" fill="var(--canvas)" stroke="var(--line)" /><text x={x} y="158" textAnchor="middle" {...textStyle} fontWeight="600">{title}</text><text x={x} y="180" textAnchor="middle" {...mutedTextStyle}>{detail}</text></g>; })}</svg></Frame>;
}

function FourPartyNetwork() {
  const boxes = [["Cardholder", 44, 50], ["Merchant", 550, 50], ["Issuing bank", 44, 220], ["Acquiring bank", 550, 220]];
  return <Frame title="The four-party payments network" caption="A payment network connects the participants without taking most consumer credit risk."><svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 760 340" role="img" aria-label="Four party payment network diagram"><defs><marker id="payment-network-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="var(--accent)" /></marker></defs><rect x="275" y="118" width="210" height="78" rx="4" fill="var(--accent)" /><text x="380" y="151" textAnchor="middle" fill="var(--canvas)" fontSize="14" fontWeight="600">Visa / Mastercard</text><text x="380" y="173" textAnchor="middle" fill="var(--canvas)" fontSize="11">Payment network</text>{boxes.map(([label, x, y]) => <g key={"participant-" + label}><rect x={x} y={y} width="166" height="62" rx="4" fill="var(--canvas)" stroke="var(--line)" /><text x={Number(x) + 83} y={Number(y) + 36} textAnchor="middle" {...textStyle} fontWeight="600">{label}</text></g>)}{[[210,81,275,130],[550,81,485,130],[210,251,275,184],[550,251,485,184]].map((edge, index) => <path key={"participant-link-" + index} d={"M " + edge[0] + " " + edge[1] + " L " + edge[2] + " " + edge[3]} stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#payment-network-arrow)" />)}</svg></Frame>;
}

function TransactionFlow() {
  const steps = ["1. Customer taps", "2. Merchant sends request", "3. Acquirer routes it", "4. Network transmits it", "5. Issuer approves or declines", "6. Settlement"];
  return <Frame title="Transaction authorization flow" caption="How a card transaction moves from customer tap to settlement."><svg className="h-auto min-w-[48rem] w-full" viewBox="0 0 1050 180" role="img" aria-label="Six step transaction authorization flow"><defs><marker id="payment-flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="var(--accent)" /></marker></defs>{steps.map((step, index) => { const x = 14 + index * 172; return <g key={"flow-" + index}><rect x={x} y="45" width="145" height="62" rx="4" fill={index === 3 ? "var(--accent)" : "var(--canvas)"} stroke="var(--line)" /><text x={x + 72} y="81" textAnchor="middle" fill={index === 3 ? "var(--canvas)" : "var(--ink)"} fontSize="11" fontWeight="600">{step}</text>{index < 5 && <path d={"M " + (x + 145) + " 76 H " + (x + 168)} stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#payment-flow-arrow)" />}</g>; })}</svg></Frame>;
}

function BusinessModels() {
  const rows = [["Network structure", "Open loop", "Open loop", "Closed loop"], ["Credit risk", "Banks", "Banks", "American Express"], ["Core role", "Routes transactions", "Routes transactions", "Issues and acquires"], ["Economic model", "Network fees", "Network fees", "Merchant fees and cardholder relationships"]];
  return <Frame title="Open-loop and closed-loop models" caption="Three payment businesses, built on two fundamentally different economic models."><svg className="h-auto min-w-[46rem] w-full" viewBox="0 0 930 300" role="img" aria-label="Comparison of Visa Mastercard and American Express business models"><rect width="930" height="42" fill="var(--accent)" /><text x="22" y="26" fill="var(--canvas)" fontSize="11" fontWeight="600">FEATURE</text>{["VISA", "MASTERCARD", "AMERICAN EXPRESS"].map((title, index) => <text key={"model-header-" + title} x={310 + index * 205} y="26" fill="var(--canvas)" fontSize="11" fontWeight="600">{title}</text>)}{rows.map((row, rowIndex) => { const y = 42 + rowIndex * 58; return <g key={"model-row-" + row[0]}><rect x="0" y={y} width="930" height="58" fill={rowIndex % 2 ? "color-mix(in srgb, var(--accent) 4%, transparent)" : "transparent"} /><text x="22" y={y + 34} {...textStyle} fontWeight="600">{row[0]}</text>{row.slice(1).map((cell, index) => <text key={"model-cell-" + row[0] + "-" + index} x={310 + index * 205} y={y + 34} {...mutedTextStyle}>{cell}</text>)}</g>; })}</svg></Frame>;
}

function NetworkSnowball() {
  const nodes = [["More cardholders", 290, 12], ["More merchants accept cards", 520, 108], ["More transactions", 430, 276], ["More banks join", 150, 276], ["Greater usefulness and trust", 60, 108]];
  return <Frame title="Payment network snowball" caption="More participants make the network more valuable to every other participant."><svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 760 385" role="img" aria-label="Reinforcing payment network effects"><defs><marker id="payment-snowball-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="var(--accent)" /></marker></defs>{nodes.map(([label, x, y], index) => <g key={"snowball-node-" + label}><rect x={x} y={y} width="180" height="58" rx="4" fill={index === 0 ? "var(--accent)" : "var(--canvas)"} stroke="var(--line)" /><text x={Number(x) + 90} y={Number(y) + 35} textAnchor="middle" fill={index === 0 ? "var(--canvas)" : "var(--ink)"} fontSize="12" fontWeight="600">{label}</text></g>)}{[[380,70,520,130],[610,166,520,290],[430,334,330,334],[150,305,150,166],[240,136,290,70]].map((edge, index) => <path key={"snowball-edge-" + index} d={"M " + edge[0] + " " + edge[1] + " L " + edge[2] + " " + edge[3]} stroke="var(--accent)" strokeWidth="1.5" fill="none" markerEnd="url(#payment-snowball-arrow)" />)}</svg></Frame>;
}

function RiskMap() {
  const risks = [["Regulatory", "Interchange limits, competition rules"], ["Technological", "New rails, tokenization, cybersecurity"], ["Competitive", "Banks, fintechs, platforms"], ["Operational", "Fraud, outages, trust failures"]];
  return <Frame title="Payment network risk map" caption="The principal risks facing payment networks operate across four interconnected categories."><svg className="h-auto min-w-[42rem] w-full" viewBox="0 0 780 330" role="img" aria-label="Four category risk map for payment networks">{risks.map(([title, detail], index) => { const x = index % 2 ? 400 : 20; const y = index > 1 ? 176 : 20; return <g key={"risk-" + title}><rect x={x} y={y} width="360" height="134" rx="4" fill={index === 0 ? "color-mix(in srgb, var(--accent) 10%, var(--canvas))" : "var(--canvas)"} stroke="var(--line)" /><text x={x + 22} y={y + 39} {...textStyle} fontSize="15" fontWeight="600">{title}</text><text x={x + 22} y={y + 73} {...mutedTextStyle} fontSize="12">{detail}</text></g>; })}</svg></Frame>;
}

function FutureRails() {
  const columns = [["Complement", "Adds value around the network", "AI fraud tools · embedded payments"], ["Compress", "Reduces costs in part of the stack", "Open banking · real-time domestic rails"], ["Replace", "Substitutes a network function", "Direct settlement through an alternative network"]];
  return <Frame title="Future payment rails framework" caption="New payment rails can complement, compress, or replace parts of the existing system."><svg className="h-auto min-w-[48rem] w-full" viewBox="0 0 990 250" role="img" aria-label="Framework for analyzing future payment rails">{columns.map(([title, purpose, example], index) => { const x = 20 + index * 322; return <g key={"rails-" + title}><rect x={x} y="15" width="300" height="210" rx="4" fill={index === 0 ? "var(--accent)" : "var(--canvas)"} stroke="var(--line)" /><text x={x + 22} y="55" fill={index === 0 ? "var(--canvas)" : "var(--ink)"} fontSize="16" fontWeight="600">{title}</text><text x={x + 22} y="94" fill={index === 0 ? "var(--canvas)" : "var(--muted)"} fontSize="12">{purpose}</text><line x1={x + 22} y1="125" x2={x + 278} y2="125" stroke={index === 0 ? "color-mix(in srgb, var(--canvas) 45%, transparent)" : "var(--line)"} /><text x={x + 22} y="160" fill={index === 0 ? "var(--canvas)" : "var(--ink)"} fontSize="11" fontWeight="600">ARTICLE EXAMPLES</text><text x={x + 22} y="188" fill={index === 0 ? "var(--canvas)" : "var(--muted)"} fontSize="11">{example}</text></g>; })}</svg></Frame>;
}

function InvestorChecklist() {
  const questions = ["Does the network remain essential?", "Is transaction volume expanding?", "Is the company capturing value without weakening the ecosystem?", "Is management adapting to new payment rails?", "Does the valuation permit attractive long-term returns?"];
  return <Frame title="Investor evaluation checklist" caption="A practical framework for assessing the long-term durability of a payment network."><svg className="h-auto min-w-[46rem] w-full" viewBox="0 0 900 330" role="img" aria-label="Five question payment network investor checklist">{questions.map((question, index) => { const y = 14 + index * 61; return <g key={"checklist-" + index}><circle cx="38" cy={y + 23} r="14" fill={index === 0 ? "var(--accent)" : "var(--canvas)"} stroke="var(--line)" /><text x="38" y={y + 27} textAnchor="middle" fill={index === 0 ? "var(--canvas)" : "var(--ink)"} fontSize="11" fontWeight="600">{index + 1}</text><rect x="68" y={y} width="805" height="46" rx="4" fill="var(--canvas)" stroke="var(--line)" /><text x="92" y={y + 29} {...textStyle} fontWeight="600">{question}</text></g>; })}</svg></Frame>;
}

export function PaymentNetworksVisual({ id }: { id: PaymentNetworksVisualId }) {
  if (id === "evolution-timeline") return <EvolutionTimeline />;
  if (id === "four-party-network") return <FourPartyNetwork />;
  if (id === "transaction-flow") return <TransactionFlow />;
  if (id === "business-models") return <BusinessModels />;
  if (id === "network-snowball") return <NetworkSnowball />;
  if (id === "risk-map") return <RiskMap />;
  if (id === "future-rails") return <FutureRails />;
  return <InvestorChecklist />;
}

export const paymentNetworksVisualSections: { heading: string; id: PaymentNetworksVisualId }[] = [
  { heading: "Section 5 — Timeline", id: "evolution-timeline" },
  { heading: "1. The Four Participants", id: "four-party-network" },
  { heading: "Step 6 – Settlement", id: "transaction-flow" },
  { heading: "2. Business Model Comparison", id: "business-models" },
  { heading: "1. Network Effects", id: "network-snowball" },
  { heading: "My Framework: The Four Categories of Risk", id: "risk-map" },
  { heading: "My Future Payments Framework: Complement, Compress or Replace", id: "future-rails" },
  { heading: "My Payment Network Investment Framework", id: "investor-checklist" },
];
