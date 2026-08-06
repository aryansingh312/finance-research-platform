import { aiInInvestingBlocks, aiInInvestingReadingTime, type ArticleBlock } from "@/data/ai-in-investing";
import { competitiveMoatsBlocks, competitiveMoatsReadingTime } from "@/data/competitive-moats";
import { behavioralBiasesBlocks, behavioralBiasesReadingTime } from "@/data/behavioral-biases";
import { paymentNetworksBlocks, paymentNetworksReadingTime } from "@/data/payment-networks";

export type ResearchStatus = "Final Draft" | "Complete" | "In progress";

export type ResearchItem = {
  slug: string;
  type: "Flagship Project" | "Project" | "Research paper" | "Research Paper";
  status: ResearchStatus;
  title: string;
  description: string;
  published: string;
  readingTime: string;
  thesis: string;
  takeaways: string[];
  sections: string[];
  subtitle?: string;
  author?: string;
  publicationDate?: string;
  pdfUrl?: string;
  blocks?: ArticleBlock[];
  article?: {
    introduction: string[];
    sectionCopy: Record<string, string[]>;
    figure?: {
      title: string;
      caption: string;
      source: string;
      values: { label: string; value: number }[];
    };
    table?: {
      caption: string;
      headers: string[];
      rows: string[][];
    };
    footnotes?: string[];
    references?: { title: string; detail: string; href?: string }[];
  };
};

export const researchItems: ResearchItem[] = [
  {
    slug: "ai-in-investing",
    type: "Flagship Project",
    status: "Final Draft",
    title: "AI in Investing",
    description: "Which AI companies are actually worth owning over the next decade?",
    published: "2026",
    readingTime: aiInInvestingReadingTime,
    author: "Aryan Singh",
    publicationDate: "4th July 2026",
    thesis: "Which AI companies are actually worth owning over the next decade?",
    takeaways: [],
    sections: [],
    blocks: aiInInvestingBlocks,
    article: {
      introduction: [
        "Artificial intelligence is changing the mechanics of investment research. It can compress routine work, surface patterns across large information sets, and make a first pass at questions that once required hours of manual synthesis.",
        "Those gains matter, but they do not settle the investment decision. A research process still needs a clear view of the business, a disciplined way to test assumptions, and the judgment to recognize when a precise-looking answer rests on weak evidence.",
      ],
      sectionCopy: {
        "The changing research workflow": [
          "The practical opportunity is not to outsource thinking. It is to reduce the friction between a question and the relevant primary material. Transcripts, filings, industry data, and prior notes can be organized more quickly, leaving more time for the investor to compare claims, inspect incentives, and form a view.",
          "This changes the rhythm of good research. The first draft of an answer becomes faster; the work of verification becomes more important. A useful process therefore separates information gathering from conclusion-making rather than treating them as the same task.",
        ],
        "Where AI creates genuine leverage": [
          "AI is most useful where it extends coverage without pretending to create conviction. It can help turn an unstructured archive into a searchable working set, compare recurring disclosures over time, and identify the questions that deserve a closer read.",
          "The return on the tool depends on the quality of the inputs and the standard of review. A weak source, a vague prompt, or an unexamined summary can move through a workflow quickly while adding very little analytical value.",
        ],
        "Limits, risks, and false precision": [
          "Financial analysis has a natural vulnerability to false precision. A model can produce a clean output even when the underlying data is incomplete, the accounting treatment is misunderstood, or the causal story is uncertain. Faster calculation does not correct those problems.",
          "The appropriate response is procedural: retain links to source material, distinguish fact from interpretation, document assumptions, and require an explicit counterargument before an idea becomes a conclusion.",
        ],
        "The role of human judgment": [
          "Judgment remains concentrated in framing. Which question matters? What would disprove the thesis? Which incentives shape the behavior of management, customers, and competitors? These are not merely retrieval problems.",
          "A durable research process uses AI as a capable assistant inside a system designed for independent thought. The goal is not more output. It is a better decision record and a clearer understanding of what must be true for an investment thesis to hold.",
        ],
      },
      figure: {
        title: "Where the research process still requires judgment",
        caption: "Illustrative framework: AI can increase the speed of research tasks, while the investor remains accountable for the quality of the question, evidence, and conclusion.",
        source: "Author's framework. Values are illustrative, not empirical estimates.",
        values: [
          { label: "Information synthesis", value: 88 },
          { label: "Evidence verification", value: 56 },
          { label: "Thesis framing", value: 34 },
          { label: "Capital allocation", value: 22 },
        ],
      },
      table: {
        caption: "A practical division of responsibility in an AI-assisted workflow.",
        headers: ["Research task", "Useful contribution from AI", "Investor responsibility"],
        rows: [
          ["Primary-source review", "Locate and organize relevant disclosures", "Check context and source quality"],
          ["Financial model", "Accelerate routine analysis", "Test assumptions and economic logic"],
          ["Investment thesis", "Surface counterpoints and open questions", "Set the decision and downside case"],
        ],
      },
      footnotes: ["This article uses AI as a subject of analysis; the framework reflects the author's independent research process.", "Illustrative values are included to clarify the framework and should not be read as measured industry data."],
      references: [
        { title: "Source archive", detail: "Primary company disclosures, investor materials, and research notes consulted during the project." },
      ],
    },
  },
  {
    slug: "competitive-moats-ai-era",
    type: "Flagship Project",
    status: "Final Draft",
    title: "Competitive Moats in the AI Era",
    description: "Why do some companies continue outperforming competitors for decades while others gradually disappear?",
    published: "2026",
    readingTime: competitiveMoatsReadingTime,
    thesis: "Why do some companies continue outperforming competitors for decades while others gradually disappear?",
    takeaways: [],
    sections: [],
    blocks: competitiveMoatsBlocks,
  },
  {
    slug: "payment-networks",
    type: "Flagship Project",
    status: "Final Draft",
    title: "The Evolution of Payment Networks",
    subtitle: "The Business Models Behind Visa and Mastercard's Global Dominance",
    description: "An independent analysis of how Visa and Mastercard built dominant global payment networks through network effects, scalable business models, regulation, and durable competitive advantages.",
    published: "2026",
    readingTime: paymentNetworksReadingTime,
    author: "Aryan Singh",
    pdfUrl: "/Payment-Networks.pdf",
    thesis: "An independent analysis of how Visa and Mastercard built dominant global payment networks through network effects, scalable business models, regulation, and durable competitive advantages.",
    takeaways: [],
    sections: [],
    blocks: paymentNetworksBlocks,
  },
  {
    slug: "behavioral-biases-in-investing",
    type: "Research Paper",
    status: "Final Draft",
    title: "Behavioral Biases in Investing",
    subtitle: "How Investor Psychology Influences Stock Market Decision-Making",
    description: "How investor psychology influences stock market decision-making.",
    published: "2026",
    readingTime: behavioralBiasesReadingTime,
    author: "Aryan Singh",
    thesis: "To what extent do behavioral biases influence investment decisions and stock market outcomes compared to fundamental analysis?",
    takeaways: [],
    sections: [],
    blocks: behavioralBiasesBlocks,
  },
  {
    slug: "network-effects-billion-dollar-companies",
    type: "Research paper",
    status: "In progress",
    title: "How Network Effects Create Billion-Dollar Companies",
    description: "An examination of how participation, liquidity, and trust compound into scalable business value.",
    published: "In progress",
    readingTime: "Proposal and literature review complete",
    thesis: "Network effects can create exceptional economic value when increased participation makes a product meaningfully more useful, rather than merely more visible.",
    takeaways: ["Not every fast-growing platform has a true network effect.", "Liquidity is often the critical mechanism in marketplace businesses.", "Network effects need reinforcement through product quality, incentives, and trust."],
    sections: ["Defining network effects", "Types of network effects", "The role of liquidity and trust", "Research in progress"],
  },
];

export function getResearchItem(slug: string) {
  return researchItems.find((item) => item.slug === slug);
}
