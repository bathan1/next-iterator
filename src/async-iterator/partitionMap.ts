import type { Either } from "../iterator/types.js";
export type { Either } from "../iterator/types.js";

export async function partitionMap<T, L, R>(
  callbackfn: (value: T, index: number) => Either<L, R> | Promise<Either<L, R>>,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<[lefts: L[], rights: R[]]> {
  let index = 0;
  const lefts: L[] = [];
  const rights: R[] = [];
  for await (const value of iterable) {
    const result = await callbackfn(value, index++);
    if (result.kind === "left") lefts.push(result.value);
    else rights.push(result.value);
  }
  return [lefts, rights];
}
