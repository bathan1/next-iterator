/**
 * `drop(limit, iterable)` is `ITERABLE` with `LIMIT` elements dropped from the start.
 *
 * ## Usage
 * ```ts
 * const droppedFirstTwo = [...drop(2, [1, 2, 3, 4, 5])];
 * console.log(droppedFirstTwo); // logs [3, 4, 5]
 * ```
 *
 * @example
 * It drops the first `LIMIT` values from `ITERABLE`
 * ```ts
 * const iterable = ["a", "b", "c", "d"];
 *
 * const dropped = drop(2, iterable);
 * expect(Array.from(dropped)).toEqual(["c", "d"]);
 * ```
 *
 * @example
 * It returns empty when `LIMIT` consumes all of `ITERABLE`
 * ```ts
 * expect(Array.from(drop(5, ["a", "b", "c"]))).toEqual([]);
 * ```
 */
export function* drop<T>(
  limit: number,
  iterable: Iterable<T>
): Generator<T, void, unknown> {
  const it = iterable[Symbol.iterator]();
  for (let i = 0; i < limit; i++) {
    const { done } = it.next();
    if (done) return void 0;
  }

  while (true) {
    const { done, value } = it.next();
    if (done) return void 0;
    yield value;
  }
}
