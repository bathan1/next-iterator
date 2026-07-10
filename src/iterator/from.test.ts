import { describe, expect, it } from "vitest";
import { from } from "./from.js";

describe("from(iterable)", () => {
  it("returns the source iterator", () => {
    const iterator = from(["a", "b"]);
    expect(iterator.next()).toEqual({ value: "a", done: false });
    expect(iterator.next()).toEqual({ value: "b", done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });
});
