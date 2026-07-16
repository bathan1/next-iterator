/**
 * `findErr(predicate, iterable)` returns the first value in `ITERABLE` matching `PREDICATE` or throws
 * {@link RangeError} if no such value is found.
 *
 * ## Usage
 * ```ts
 * const firstOpen = findErr((todo) => !todo.done, todos);
 * ```
 *
 * @example
 * It returns the first value that satisfies `CALLBACKFN`
 * ```ts
 * expect(findErr((x) => x > 2, [1, 2, 3, 4])).toBe(3);
 * ```
 *
 * @example
 * It throws when no value satisfies `CALLBACKFN`
 * ```ts
 * expect(() => findErr((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
 * ```
 */
export function findErr<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): S;
export function findErr<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): T;

export function findErr<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): T {
  let index = 0;

  for (const value of iterable) {
    if (predicate(value, index++)) return value;
  }

  throw new RangeError("No value satisfies predicate");
}
