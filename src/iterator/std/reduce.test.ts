import { reduce } from "./reduce.js";
import { describe, expect, it } from "vitest";

describe("reduce(callbackfn, initialValue, iterable)", () => {
  it("folds `ITERABLE` into `INITIAL_VALUE`", () => {
    expect(reduce((sum, x) => sum + x, 0, [1, 2, 3])).toBe(6);
  });

  it("passes the index to `CALLBACKFN`", () => {
    expect(reduce((acc, x, i) => [...acc, `${i}:${x}`], [] as string[], ["a", "b"])).toEqual([
      "0:a",
      "1:b",
    ]);
  });
});
