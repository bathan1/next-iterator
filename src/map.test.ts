import { randomIterableFromArray } from "./-test.helpers.js";
import { expect, it, vi } from "vitest";
import { map } from "./map.js";

it("calls `CALLBACK_FN` on demand", () => {
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
