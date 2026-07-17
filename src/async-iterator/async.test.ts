import { describe, expect, it } from "vitest";
import { chunk } from "./chunk.js";
import { first } from "./first.js";
import { findErr } from "./findErr.js";
import { partition } from "./partition.js";
import { type Either, partitionMap } from "./partitionMap.js";

async function* values() {
  yield 1;
  yield -1;
  yield 2;
  yield -2;
}

describe("async ext helpers", () => {
  it("chunks async iterables", async () => {
    expect(await Array.fromAsync(chunk(2, values()))).toEqual([[1, -1], [2, -2]]);
  });

  it("returns the first async value", async () => {
    await expect(first(values())).resolves.toBe(1);
  });

  it("returns or throws for async findErr", async () => {
    await expect(findErr((value) => value < 0, values())).resolves.toBe(-1);
    await expect(findErr((value) => value > 10, values())).rejects.toThrow(RangeError);
  });

  it("partitions async values", async () => {
    await expect(partition((value) => value > 0, values())).resolves.toEqual([
      [1, 2],
      [-1, -2],
    ]);
  });

  it("partitionMaps async values", async () => {
    const result = await partitionMap(
      async (value): Promise<Either<string, number>> =>
        value < 0
          ? { kind: "left", value: `invalid:${value}` }
          : { kind: "right", value: value * 2 },
      values()
    );

    expect(result).toEqual([
      ["invalid:-1", "invalid:-2"],
      [2, 4],
    ]);
  });
});
