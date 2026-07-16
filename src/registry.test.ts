import { describe, expect, it } from "vitest";
import registry from "../registry.json";

describe("extra registry items", () => {
  const extras = registry.items.filter((item) => item.name.includes("/"));

  it("publishes every helper under its iterator family", () => {
    expect(extras).not.toHaveLength(0);

    for (const item of extras) {
      const [family, itemName] = item.name.split("/");
      const helperName = itemName?.replace(/\.js$/, "");
      const sourcePrefix = family === "async-iterator" ? "async." : "";

      expect(item.files[0]?.path).toBe(`./src/${family}/${sourcePrefix}${helperName}.ts`);
      expect(item.files[0]?.target).toBe(`@lib/${family}/${helperName}.ts`);
      expect(item.files.every((file) => file.target.startsWith(`@lib/${family}/`))).toBe(true);
    }
  });

  it("installs standard helpers under std", () => {
    for (const itemName of ["iterator.js", "async-iterator.js"]) {
      const item = registry.items.find((candidate) => candidate.name === itemName);
      const family = itemName.replace(/\.js$/, "");

      expect(item).toBeDefined();
      expect(
        item?.files.slice(1).every((file) => file.path.startsWith(`./src/${family}/std/`))
      ).toBe(true);
      expect(
        item?.files.slice(1).every((file) => file.target.startsWith(`@lib/${family}/std/`))
      ).toBe(true);
    }
  });
});
