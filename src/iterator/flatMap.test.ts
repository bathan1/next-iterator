import { describe, expect, it } from "vitest";
import { flatMap } from "./flatMap.js";

describe("flatMap(callbackfn, iterable)", () => {
  it("lazily flattens each callback result", () => {
    expect([...flatMap((value) => [value, value * 2], [1, 2, 3])]).toEqual([1, 2, 2, 4, 3, 6]);
  });
});
