import { describe, expect, it } from "vitest";
import { toArray } from "./toArray.js";

describe("toArray(iterable)", () => {
  it("materializes the iterable", () => {
    expect(toArray(new Set(["a", "b"]))).toEqual(["a", "b"]);
  });
});
