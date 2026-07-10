/**
 * `filter(predicate, iterable)` lazily yields the values in `ITERABLE` that satisfy `PREDICATE`.
 *
 * ## Usage
 * ```ts
 * const even = [...filter((value) => value % 2 === 0, [1, 2, 3, 4])];
 * ```
 *
 * @example
 * It lazily yields matching values and their indexes
 * ```ts
 * expect([...filter((value, index) => value % 2 === 0 && index > 0, [1, 2, 3, 4])]).toEqual([
 *   2, 4,
 * ]);
 * ```
 */
export function filter<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): Generator<S, void, unknown>;

export function filter<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): Generator<T, void, unknown>;

export function* filter<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): Generator<T, void, unknown> {
  let index = 0;
  for (const value of iterable) {
    if (predicate(value, index++)) yield value;
  }
}
