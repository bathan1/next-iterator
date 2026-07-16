import { describe, expect, it } from "vitest";
import registry from "../registry.json";

describe("extra registry items", () => {
  const extras = registry.items.filter((item) =>
    /^\.\/src\/(?:async-iterator|iterator)\//.test(item.files[0]?.path ?? "")
  );

  it("publishes every helper under a flat item name", () => {
    expect(extras).not.toHaveLength(0);

    for (const item of extras) {
      const source = item.files[0]?.path.match(
        /^\.\/src\/(async-iterator|iterator)\/(?:async\.)?([^/]+)\.ts$/
      );
      const family = source?.[1];
      const helperName = source?.[2];
      const sourcePrefix = family === "async-iterator" ? "async." : "";

      expect(item.name).toBe(`${sourcePrefix}${helperName}.js`);
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
