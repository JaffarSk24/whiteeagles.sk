// The home-screen icon must be inlined in every page as a data URL: on
// iOS 27.2 "Add to Home Screen" shows a letter for an icon it has to fetch
// separately. Run after `npm run build`, against dist/.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = path.join(root, "dist");
const icon = readFileSync(path.join(root, "public", "apple-touch-icon.png"));

const pages = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name === "index.html") pages.push(full);
  }
};
for (const locale of ["sk", "ru", "en"]) walk(path.join(dist, locale));

test("the icon file is an opaque 180x180 PNG", () => {
  assert.equal(icon.subarray(1, 4).toString(), "PNG");
  assert.equal(icon.readUInt32BE(16), 180);
  assert.equal(icon.readUInt32BE(20), 180);
  const colorType = icon[25];
  // 4 and 6 carry an alpha channel; a palette image (3) is opaque unless it
  // has a tRNS chunk.
  assert.ok(![4, 6].includes(colorType), `colour type ${colorType} has alpha`);
  assert.ok(!icon.includes(Buffer.from("tRNS")), "the palette has transparency");
});

test("every page carries the icon inline", () => {
  assert.ok(pages.length > 100, `only ${pages.length} pages found in dist/`);
  for (const page of pages) {
    const html = readFileSync(page, "utf8");
    const rel = path.relative(dist, page);
    const links = [...html.matchAll(/<link\b[^>]*\brel="apple-touch-icon"[^>]*>/g)].map((m) => m[0]);
    assert.equal(links.length, 1, `${rel}: ${links.length} apple-touch-icon links`);
    assert.ok(!html.includes("apple-touch-icon-precomposed"), `${rel}: precomposed link`);
    const href = links[0].match(/\bhref="([^"]+)"/)?.[1] ?? "";
    assert.ok(href.startsWith("data:image/png;base64,"), `${rel}: href is not a PNG data URL`);
    const bytes = Buffer.from(href.slice("data:image/png;base64,".length), "base64");
    assert.ok(bytes.equals(icon), `${rel}: inlined bytes differ from public/apple-touch-icon.png`);
    assert.match(links[0], /\bsizes="180x180"/, `${rel}: no sizes="180x180"`);
  }
});
