/**
 * `find(predicate, iterable)` returns the first `value` in `ITERABLE` that
 * satisfies `PREDICATE(x)` or returns `undefined` otherwise.
 *
 * ## Usage
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos as { completed: boolean }[]);
 *
 * const firstCompleted = find((todo): todo is { id: number; completed: true } => todo.completed, todos);
 * console.log(firstCompleted.completed); // true
 * ```
 *
 * @example
 * It returns the first matching value
 * ```ts
 * expect(find((value) => value > 2, [1, 2, 3, 4])).toBe(3);
 * ```
 *
 * @example
 * It returns `undefined` when no value matches
 * ```ts
 * expect(find((value) => value > 4, [1, 2, 3])).toBeUndefined();
 * ```
 */
export function find<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): S | undefined;
export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): T | undefined;

export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): T | undefined {
  let index = 0;

  for (const value of iterable) {
    if (predicate(value, index++)) {
      return value;
    }
  }

  return;
}
