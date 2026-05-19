import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const scanDirs = ["app", "components", "data", "lib"];
const blockedPatterns = [
  /https?:\/\/(?:www\.)?theswiftest\.com/i,
  /https?:\/\/[^"'\s)]*swiftest[^"'\s)]*/i,
  /https?:\/\/www\.awin1\.com\/cread\.php\?[^"'\s)]*awinmid=68990/i,
  /https?:\/\/www\.awin1\.com\/cread\.php\?[^"'\s)]*awinmid=118489/i
];

const allowedFiles = new Set([
  "data/providers.ts",
  "data/siteConfig.ts",
  "lib/affiliate.ts"
]);

const violations = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      walk(path);
      continue;
    }

    if (!/\.(ts|tsx|js|jsx|md|mjs)$/.test(path)) continue;

    const relPath = relative(root, path);
    const source = readFileSync(path, "utf8");

    blockedPatterns.forEach((pattern) => {
      if (pattern.test(source) && !allowedFiles.has(relPath)) {
        violations.push(relPath);
      }
    });
  }
}

scanDirs.forEach((dir) => walk(join(root, dir)));

if (violations.length > 0) {
  console.error("Direct partner outbound URLs are not allowed in public source files.");
  console.error("Use /go/[providerSlug] and configure approved affiliate URLs in provider config instead.");
  violations.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

console.log("Outbound link audit passed: no direct partner URLs in public source files.");
