import { describe, it, expect } from "vitest";
import { every } from "./every.js";

describe("every(predicate, iterable)", () => {
  it("is `true` when every value matches `PREDICATE`", () => {
    expect(every((x) => x.length > 0, ["a", "bb", "ccc"])).toBe(true);
  });

  it("is `false` when any value does not match `PREDICATE`", () => {
    expect(every((x) => x.length > 0, ["a", "", "ccc"])).toBe(false);
  });
});
