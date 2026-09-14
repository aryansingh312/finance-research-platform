import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";

const require = createRequire(import.meta.url);
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText, filename);
const { frameworks } = require("../src/data/frameworks.ts");
const baselineSource = execFileSync("git", ["show", "efb107a0eb834def1dc5e2f87ff7bf785cb04a8f:src/data/frameworks.ts"], { encoding: "utf8" });
const baseline = {};
new Function("exports", ts.transpileModule(baselineSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(baseline);
assert.deepEqual(frameworks[0], baseline.frameworks[0], "Business Quality must remain unchanged");
assert.equal(frameworks.length, 15);
assert.equal(new Set(frameworks.map((f) => f.slug)).size, 15);
for (const f of frameworks) {
  assert.equal(new Set(f.sections.map((s) => s.id)).size, f.sections.length);
  assert.match(f.readingTime, /^\d+ min read$/);
  for (const related of f.relatedSlugs ?? []) assert.ok(related !== f.slug && frameworks.some((other) => other.slug === related));
  for (const section of f.sections) for (const block of section.content ?? []) if (block.type === "table") for (const row of block.table.rows) assert.equal(row.length, block.table.headers.length);
}
const moat = frameworks.find((f) => f.slug === "economic-moat-measurement-framework");
const worked = moat.sections.flatMap((s) => s.content ?? []).find((b) => b.type === "table" && b.table.headers.includes("Raw Score")).table;
assert.equal(worked.rows.slice(0, -1).reduce((sum, row) => sum + Number(row[3]), 0), 85.5);
const published = JSON.stringify(frameworks.slice(1));
assert.ok(!published.includes("Total Moat Score: 48") && !published.includes("Total Moat Score: 79"));
assert.ok(!published.includes("⭐⭐") && !published.includes("2023–Present"));
console.log("DATA PASS: 15 records; unchanged Business Quality; IDs, related links, tables and 85.5 example valid.");
console.log(frameworks.map((f) => `${f.slug}: ${f.readingTime}`).join("\n"));
if (!process.env.PLAYWRIGHT_MODULE) process.exit(0);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
const output = process.env.FRAMEWORK_QA_OUTPUT ?? fs.mkdtempSync(path.join(os.tmpdir(), "framework-qa-"));
fs.mkdirSync(output, { recursive: true });
const base = process.env.FRAMEWORK_BASE_URL ?? "http://127.0.0.1:3000";
const results = [];
try {
  for (const [mode, viewport] of [["desktop", { width: 1440, height: 1000 }], ["mobile", { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    // The baseline site has no favicon.ico. Record this known global issue separately.
    page.on("console", (message) => { if (message.type() === "error") {
      if (message.location().url === `${base}/favicon.ico` && message.text().includes("404")) console.log("BASELINE WARNING: missing favicon.ico (outside framework scope)");
      else errors.push(`${message.text()} ${message.location().url}`);
    } });
    for (const theme of ["light", "dark"]) {
      await page.goto(base + "/library/frameworks", { waitUntil: "networkidle" });
      if ((await page.locator("html").getAttribute("class") ?? "").includes("dark") !== (theme === "dark")) await page.getByRole("button", { name: "Toggle color mode" }).click();
      assert.equal(await page.locator("main article").count(), 15);
      await page.screenshot({ path: path.join(output, `index-${mode}-${theme}.png`) });
      for (let i = 0; i < frameworks.length; i++) {
        const f = frameworks[i];
        const response = await page.goto(`${base}/library/frameworks/${f.slug}`, { waitUntil: "networkidle" });
        assert.equal(response.status(), 200, f.slug);
        assert.equal(await page.locator("h1").innerText(), f.title);
        assert.equal((await page.locator("html").getAttribute("class") ?? "").includes("dark"), theme === "dark");
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, `page overflow: ${f.slug}`);
        const ids = await page.locator("main section[id]").evaluateAll((sections) => sections.map((s) => s.id));
        for (const section of f.sections) assert.ok(ids.includes(section.id));
        const anchors = await page.locator('main a[href^="#"]').evaluateAll((links) => links.map((a) => a.getAttribute("href").slice(1)));
        for (const anchor of anchors) assert.ok(ids.includes(anchor));
        if (mode === "mobile") await page.locator("main details summary").click();
        const target = f.sections[Math.floor(f.sections.length / 2)].id;
        await page.locator(`main a[href="#${target}"]:visible`).first().click();
        await page.waitForFunction((id) => location.hash === `#${id}`, target);
        const nav = page.getByRole("navigation", { name: "Framework navigation", exact: true });
        const expected = [frameworks[i - 1]?.slug, frameworks[i + 1]?.slug].filter(Boolean).map((slug) => `/library/frameworks/${slug}`);
        assert.deepEqual(await nav.locator("a").evaluateAll((links) => links.map((a) => a.getAttribute("href"))), expected);
        for (const slug of f.relatedSlugs ?? []) assert.ok(await page.locator(`main a[href="/library/frameworks/${slug}"]`).count());
        if (i > 0) {
          const tables = f.sections.flatMap((s) => s.content ?? []).filter((b) => b.type === "table");
          assert.equal(await page.locator("main table").count(), tables.length, `table count: ${f.slug}`);
          for (let t = 0; t < tables.length; t++) {
            const table = page.locator("main table").nth(t);
            assert.equal(await table.locator("tbody tr").count(), tables[t].table.rows.length);
            assert.equal(await table.locator('thead th[scope="col"]').count(), tables[t].table.headers.length);
          }
          const defects = await page.locator('main figure svg[role="img"]').evaluateAll((svgs) => svgs.flatMap((svg) => {
            const vb = svg.viewBox.baseVal;
            return Array.from(svg.querySelectorAll("text")).filter((node) => { const b = node.getBBox(); return b.x < 0 || b.y < 0 || b.x + b.width > vb.width + 1 || b.y + b.height > vb.height + 1; }).map((node) => node.textContent);
          }));
          assert.deepEqual(defects, [], `SVG overflow: ${f.slug}`);
          const figures = page.locator("main figure");
          if (theme === "light" && mode === "mobile") for (let v = 0; v < await figures.count(); v++) await figures.nth(v).screenshot({ path: path.join(output, `${f.slug}-visual-${v}.png`) });
        }
        await page.evaluate(() => scrollTo(0, 0));
        await page.waitForTimeout(150);
        if (theme === "dark" && mode === "mobile" || theme === "light" && mode === "desktop") await page.screenshot({ path: path.join(output, `${f.slug}-${mode}-${theme}.png`) });
        results.push({ slug: f.slug, mode, theme, result: "PASS" });
        console.log(`PASS ${mode}/${theme} ${f.slug}`);
      }
    }
    assert.deepEqual(errors, [], `${mode} browser/runtime errors`);
    await context.close();
  }
  const page = await browser.newPage();
  assert.equal((await page.goto(base + "/library/frameworks/not-a-framework")).status(), 404);
  await page.close();
  fs.writeFileSync(path.join(output, "results.json"), JSON.stringify(results, null, 2));
  console.log(`BROWSER PASS: ${results.length} checks. Screenshots: ${output}`);
} finally { await browser.close(); }
