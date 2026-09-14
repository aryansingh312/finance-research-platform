import type { Framework, FrameworkBlock } from "./frameworks";

function blockText(block: FrameworkBlock): string {
  switch (block.type) {
    case "paragraph": case "heading": return block.text;
    case "list": return block.items.join(" ");
    case "table": return [block.table.caption, ...block.table.headers, ...block.table.rows.flat()].join(" ");
    case "diagram": return [block.diagram.title, block.diagram.caption, block.diagram.finalOutcome ?? "", ...block.diagram.nodes.map((node) => `${node.label} ${node.outcome ?? ""}`)].join(" ");
  }
}

/** Counts the publication, not navigation labels or the PDF availability card. */
export function frameworkReadingTime(framework: Omit<Framework, "readingTime">): string {
  const text = [framework.title, framework.purpose, ...Object.values(framework.overview), ...framework.sections.flatMap((section) => [section.title, ...(section.paragraphs ?? []), ...(section.lists ?? []).flatMap((list) => [list.title ?? "", ...list.items]), section.callout?.text ?? "", ...(section.content ?? []).map(blockText)])].join(" ");
  return `${Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 220))} min read`;
}
