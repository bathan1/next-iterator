import { describe, it, expect } from "vitest";
import { findErr } from "./findErr.js";

describe("findErr(predicate, iterable)", () => {
  it("returns the first value that satisfies `CALLBACKFN`", () => {
    expect(findErr((x) => x > 2, [1, 2, 3, 4])).toBe(3);
  });

  it("throws when no value satisfies `CALLBACKFN`", () => {
    expect(() => findErr((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
  });
});
