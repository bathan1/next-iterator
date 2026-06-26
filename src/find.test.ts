import { describe, it, expect } from "vitest";
import { find } from "./find.js";

describe("find(callbackfn, iterable)", () => {
  it("returns the first value that satisfies `CALLBACKFN`", () => {
    expect(find((x) => x > 2, [1, 2, 3, 4])).toBe(3);
  });

  it("throws when no value satisfies `CALLBACKFN`", () => {
    expect(() => find((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
  });
});
