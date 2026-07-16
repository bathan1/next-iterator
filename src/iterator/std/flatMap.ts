/**
 * `flatMap(callbackfn, iterable)` lazily yields every value from each iterable returned by `CALLBACKFN` for `ITERABLE`.
 *
 * ## Usage
 * ```ts
 * const words = [...flatMap((line) => line.split(" "), lines)];
 * ```
 *
 * @example
 * It lazily flattens each callback result
 * ```ts
 * expect([...flatMap((value) => [value, value * 2], [1, 2, 3])]).toEqual([1, 2, 2, 4, 3, 6]);
 * ```
 */
export function flatMap<T, U>(
  callbackfn: (value: T, index: number) => Iterable<U>,
  iterable: Iterable<T>
): Generator<U, void, unknown>;
export function* flatMap<T, U>(
  callbackfn: (value: T, index: number) => Iterable<U>,
  iterable: Iterable<T>
): Generator<U, void, unknown> {
  let index = 0;
  for (const value of iterable) {
    yield* callbackfn(value, index++);
  }
}
