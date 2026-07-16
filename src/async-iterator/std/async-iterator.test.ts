import { describe, expect, it, vi } from "vitest";
import { AsyncIterator } from "../../async-iterator.js";

async function* count(n: number) {
  for (let i = 0; i < n; i++) {
    yield i + 1;
  }
}

describe("AsyncIterator", () => {
  it("attaches async standard helpers", async () => {
    expect(await AsyncIterator.toArray(AsyncIterator.drop(2, count(4)))).toEqual([3, 4]);
    expect(await AsyncIterator.every((value) => value > 0, count(3))).toBe(true);
    expect(await AsyncIterator.toArray(AsyncIterator.filter((value) => value > 1, count(3)))).toEqual([
      2,
      3,
    ]);
    await expect(AsyncIterator.find((value) => value > 2, count(3))).resolves.toBe(3);
    expect(await AsyncIterator.toArray(AsyncIterator.flatMap((value) => [value, value * 10], count(2)))).toEqual([
      1,
      10,
      2,
      20,
    ]);
    expect(await AsyncIterator.includes(2, count(3))).toBe(true);
    expect(await AsyncIterator.toArray(AsyncIterator.map(async (value) => value * 2, count(3)))).toEqual([
      2,
      4,
      6,
    ]);
    await expect(AsyncIterator.reduce((sum, value) => sum + value, 0, count(3))).resolves.toBe(6);
    await expect(AsyncIterator.some((value) => value === 2, count(3))).resolves.toBe(true);
    expect(await AsyncIterator.toArray(AsyncIterator.take(2, count(4)))).toEqual([1, 2]);
  });

  it("does not await predicate callbacks", async () => {
    expect(await AsyncIterator.every(async () => false, count(2))).toBe(true);
    expect(await AsyncIterator.toArray(AsyncIterator.filter(async () => false, count(2)))).toEqual([
      1,
      2,
    ]);
  });

  it("attaches async static helpers", async () => {
    const each = vi.fn();
    await AsyncIterator.forEach(each, AsyncIterator.concat([0], count(2)));
    expect(each).toHaveBeenCalledWith(0, 0);
    expect(each).toHaveBeenCalledWith(1, 1);
    expect(each).toHaveBeenCalledWith(2, 2);

    expect(await AsyncIterator.toArray(AsyncIterator.zip([[1, 2], count(3)]))).toEqual([
      [1, 1],
      [2, 2],
    ]);
    expect(
      await AsyncIterator.toArray(
        AsyncIterator.zipKeyed({
          id: [1, 2],
          value: count(3),
        })
      )
    ).toEqual([
      { id: 1, value: 1 },
      { id: 2, value: 2 },
    ]);
  });
});
