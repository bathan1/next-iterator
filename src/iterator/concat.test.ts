import { describe, expect, it } from "vitest";
import { concat } from "./concat.js";

describe("concat(...iterables)", () => {
  it("yields each iterable in order", () => {
    expect(Array.from(concat([1], new Set([2, 3]), [4]))).toEqual([1, 2, 3, 4]);
  });
});
