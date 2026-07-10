import { describe, it, expect } from "vitest";
import { first } from "./first.js";

describe("first", () => {
  it("returns the first value from an iterable", () => {
    expect(first(["foo", "bar", "baz"])).toBe("foo");
  });

  it("returns undefined when the iterable is empty", () => {
    expect(first([])).toBeUndefined();
  });
});
