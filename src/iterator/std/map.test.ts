import { randomIterableFromArray } from "../../-test.helpers.js";
import { describe, expect, it, vi } from "vitest";
import { map } from "./map.js";

describe("map(callbackfn, iterable)", () => {
  it("calls `CALLBACKFN` on demand", () => {
    const callbackfn = vi.fn((x: number) => String(x * 2));
    const iterable = randomIterableFromArray(
      Array.from({ length: Math.ceil(Math.random() * 100) }, (_, i) => i)
    );
    const mapped = map(callbackfn, iterable);

    expect(callbackfn).not.toHaveBeenCalled();
    mapped.next();
    expect(callbackfn).toHaveBeenCalled();
    callbackfn.mockClear();
  });
  it("partially applies `CALLBACK_FN` through native `.bind`", () => {
    function double(x: number) {
      return x * 2;
    }
    const doubleNumbers = map.bind(null, double);

    const result = Array.from(doubleNumbers([1, 2, 3]));
    expect(result).toEqual([2, 4, 6]);
  });
});
