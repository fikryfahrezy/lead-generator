import { readFileSync } from "fs";
import { join } from "path";
import { defineConfig } from "tsup";

// Read package.json to get dependencies
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "package.json"), "utf-8"),
);

// Auto-detect internal packages (assuming they start with @aksel/)
const internalPackages = Object.keys({
  ...packageJson.dependencies,
}).filter((pkg) => pkg.startsWith("@aksel/"));

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node18",
  bundle: true,
  clean: true,
  sourcemap: true,
  minify: process.env.NODE_ENV === "production",

  // Bundle these packages
  noExternal: [
    ...internalPackages,
    // Somehow this package resolving to the project root `node_modules`
    // instead of to the local `node_modules`, so we include it to bundle
    "dataforseo-client",
  ],
});
