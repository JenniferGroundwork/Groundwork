// Build-time prerender. Runs after `vite build` and the SSR build.
// Writes real HTML for each public page, with its own title, description and canonical URL.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://www.groundworkconsult.ca";

const PAGES = [
  {
    url: "/",
    out: "index.html",
    title: "Groundwork Consult | Small Business Operations",
    description: "Fixed-scope SOPs, role clarity, and automation for founder-led businesses in trades, wellness, and client-facing services. Built and handed off.",
  },
  {
    url: "/self-assessment",
    out: "self-assessment/index.html",
    title: "Free Operations Self-Assessment | Groundwork Consult",
    description: "A free 40-question self-assessment across 10 areas of your operations. Get an instant scorecard of where your small business is running on memory instead of systems.",
  },
  {
    url: "/book",
    out: "book/index.html",
    title: "Book a Discovery Call | Groundwork Consult",
    description: "Book a free 30-minute discovery call with Groundwork Consult to talk through where your operations are breaking down and whether a fixed-scope build is the right fit.",
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

// Untouched SPA shell for client-only routes (tools, 404s). Kept out of search results.
const shell = template.replace(
  /<meta name="robots"[^>]*>/,
  '<meta name="robots" content="noindex, follow" />'
).replace(/\s*<link rel="canonical"[^>]*>/, "");
fs.writeFileSync(path.join(dist, "app.html"), shell);

const { render } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

for (const page of PAGES) {
  const fullUrl = SITE + (page.url === "/" ? "/" : page.url);
  const body = render(page.url);
  if (!body || body.length < 200) throw new Error(`Prerender produced almost nothing for ${page.url}`);

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${fullUrl}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${fullUrl}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`)
    .replace(/\s*<noscript>[\s\S]*?<\/noscript>/, "")
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const outPath = path.join(dist, page.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`prerendered ${page.url} -> dist/${page.out} (${body.length} chars)`);
}

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
