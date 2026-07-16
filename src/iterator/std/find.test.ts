import { describe, expect, it } from "vitest";
import { find } from "./find.js";

describe("find(predicate, iterable)", () => {
  it("returns the first matching value", () => {
    expect(find((value) => value > 2, [1, 2, 3, 4])).toBe(3);
  });

  it("returns `undefined` when no value matches", () => {
    expect(find((value) => value > 4, [1, 2, 3])).toBeUndefined();
  });
});
