/**
 * `first(iterable)` returns the first value of `ITERABLE`, or `undefined`
 * if `ITERABLE` is empty.
 *
 * ## Usage
 * ```ts
 * const firstTodo = first([
 *   { todo: "Buy milk" },
 *   { todo: "Walk dog" },
 * ]);
 *
 * console.log(firstTodo?.todo);
 * ```
 *
 * @example
 * It returns the first value from an iterable
 * ```ts
 * expect(first(["foo", "bar", "baz"])).toBe("foo");
 * ```
 *
 * @example
 * It returns undefined when the iterable is empty
 * ```ts
 * expect(first([])).toBeUndefined();
 * ```
 */
export function first<T>(
  iterable: Iterable<T>,
): T | undefined;

export function first<T>(
  iterable: Iterable<T>,
): T | undefined {
  for (const value of iterable) {
    return value;
  }

  return undefined;
}
