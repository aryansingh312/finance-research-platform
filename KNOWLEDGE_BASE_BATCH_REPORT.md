# Finance Knowledge Base batch report

Branch: `knowledge-base-batch`
Scope: `/library/knowledge` and ten source-led article routes.
No content from the other fourteen audited DOCX files was imported.

The articles retain the author's explanations and terminology from the approved DOCX files. Reading time is calculated from rendered article text at 220 words per minute and rounded up. Publication dates were not inferred.

| Source file | Article / slug | Category | Reading time | Formulas preserved / intentionally omitted | Source tables | Original SVG | Unsupported material omitted; overlap and cross-links | QA |
|---|---|---|---:|---|---:|---|---|---|
| `03_Corporate_Finance/Financial_Statement_Framework.docx` | Financial Statements / `financial-statements` | Financial Analysis | 5 min | Accounting equation; none invented | 0 | Three financial statements | Undated company illustration; links to Financial Statement Analysis Framework and related concepts | Pass |
| `02_Accounting/Financial_Ratios_Handbook.docx` | Financial Ratios / `financial-ratios` | Financial Analysis | 31 min | All explicit ratio formulas; no additional scoring or conversions | 17 | Ratio families | Undated named-company claims; interpretive range tables are explicitly contextual, not a calculator; links to statements and valuation basics | Pass |
| `03_Corporate_Finance/Owner Earnings Handbook.docx` | Owner Earnings and Free Cash Flow / `owner-earnings` | Financial Analysis | 5 min | Source owner-earnings definition, FCF calculation, and worked comparison; none invented | 1 | Two views of available cash | Company appeal/star table and undated company illustrations; links to statements and capital allocation | Pass |
| `03_Corporate_Finance/Cost_of_Capital_Handbook.docx` | Cost of Capital / `cost-of-capital` | Corporate Finance | 7 min | Source after-tax debt and CAPM numerical examples; missing displayed WACC/CAPM equations intentionally omitted | 0 | Cost-of-capital architecture | Undated company claims; links to DCF and capital allocation | Pass |
| `03_Corporate_Finance/Capital Allocation Handbook.docx` | Capital Allocation / `capital-allocation` | Corporate Finance | 5 min | No source formula; no scoring imported | 0 | Uses of cash | Company case notes, scorecard, and duplicate framework process; links to Capital Allocation Framework V2 | Pass |
| `04_Economics/Economic_Indicators_Handbook.docx` | Economic Indicators / `economic-indicators` | Economics | 6 min | Missing GDP equation intentionally omitted | 1 | Economic dashboard | Unsupported equation reconstruction; U.S. policy context retained as such | Pass |
| `05_Valuation/Valuation_Basics.docx` | Valuation Basics / `valuation-basics` | Valuation | 3 min | Source market-cap calculation; no new formula | 0 | None; glossary structure is clearer without one | Stale company-price/size examples; links to ratios, DCF and Valuation Framework | Pass |
| `05_Valuation/Discounted_Cash_Flow_(DCF)_Handbook.docx` | Discounted Cash Flow / `discounted-cash-flow` | Valuation | 7 min | Source illustrative inputs retained; missing displayed DCF equation and calculated valuation output intentionally omitted | 0 | DCF sequence | Unsourced terminal-growth range and undated company claims; links to cost of capital, margin of safety and Valuation Framework | Pass |
| `05_Valuation/Margin_of_Safety_Framework.docx` | Margin of Safety / `margin-of-safety` | Valuation | 6 min | Source percentage formula; no new threshold or target | 0 | Price/value relationship | Named-company suggested entry margins and timing examples; links to DCF and Valuation Framework | Pass |
| `06_Behavioral_Finance/Circle_of_Competence_Framework.docx` | Circle of Competence / `circle-of-competence` | Investor Judgment | 5 min | None present or added | 1 | Learning layers | Time-dependent personal circle and named-company examples; links to related concepts | Pass |

## QA

- Production build: passed; all ten routes statically generated.
- Type-check: passed (`tsc --noEmit --incremental false`).
- Lint: passed (`eslint .`).
- HTTP: index, all ten articles, search, and sitemap returned 200.
- Browser: all ten routes opened at desktop (1440px) and mobile (390px) widths without page overflow or React page errors; TOC, tables, SVGs, and related links rendered. Light/dark toggles worked.
- Search: ten article-specific destinations registered.
- Sitemap: ten article-specific URLs registered.

## Editorial limitations

The supplied sources contain no linked citations or footnotes. Their illustrative ranges, numerical examples, and qualitative interpretations remain the author's source material; they have not been independently verified or updated with outside research. No missing formula, valuation output, current company figure, recommendation, or scoring rule was supplied by the import.
