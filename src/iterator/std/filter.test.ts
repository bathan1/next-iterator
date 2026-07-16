import { describe, expect, it } from "vitest";
import { filter } from "./filter.js";

describe("filter(predicate, iterable)", () => {
  it("lazily yields matching values and their indexes", () => {
    expect([...filter((value, index) => value % 2 === 0 && index > 0, [1, 2, 3, 4])]).toEqual([
      2, 4,
    ]);
  });
});
