import { describe, expect, it } from "vitest";
import { zipKeyed } from "./zipKeyed.js";

describe("zipKeyed(iterables, options?)", () => {
  it("zips matching object keys", () => {
    expect(Array.from(zipKeyed({ id: [1, 2], label: ["a", "b", "c"] }))).toEqual([
      { id: 1, label: "a" },
      { id: 2, label: "b" },
    ]);
  });

  it('pads keyed values when MODE = "longest"', () => {
    expect(
      Array.from(
        zipKeyed(
          {
            id: [1, 2],
            label: ["a"],
          },
          {
            mode: "longest",
            padding: { label: "missing" },
          }
        )
      )
    ).toEqual([
      { id: 1, label: "a" },
      { id: 2, label: "missing" },
    ]);
  });
});
