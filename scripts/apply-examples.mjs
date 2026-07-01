import { readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const sourceDirectory = new URL("src/", root);
const entries = await readdir(sourceDirectory, { withFileTypes: true });

const modules = entries
  .filter(
    (entry) =>
      entry.isFile() &&
      entry.name.endsWith(".ts") &&
      !entry.name.endsWith(".test.ts") &&
      entries.some((candidate) => candidate.name === entry.name.replace(/\.ts$/, ".test.ts"))
  )
  .map((entry) => `src/${entry.name}`)
  .sort();

for (const modulePath of modules) {
  const result = spawnSync(process.execPath, ["--import=tsx", "scripts/print-it.ts", modulePath], {
    cwd: root,
    stdio: "inherit",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
