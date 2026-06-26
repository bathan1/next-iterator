import { describe, it } from "vitest";
import { forEach } from "./forEach";

describe("forEach(callbackfn, iterable)", () => {
  it("immediately consumes the iterable", () => {
    const iterable = [1, 2, 3].values();
    forEach(() => void 0, iterable);
  });
});
