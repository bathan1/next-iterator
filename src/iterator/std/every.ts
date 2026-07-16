/**
 * `every(predicate, iterable)` is `true` if every `value` in `ITERABLE` satisfies
 * `PREDICATE(value)` or `false` otherwise.
 *
 * ## Usage
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos as { completed: boolean }[]);
 *
 * const areAllCompleted = every((todo): todo is { id: number; completed: true } => todo.completed, todos);
 * console.log(areAllCompleted); // false
 * ```
 *
 * @example
 * It is `true` when every value matches `PREDICATE`
 * ```ts
 * expect(every((x) => x.length > 0, ["a", "bb", "ccc"])).toBe(true);
 * ```
 *
 * @example
 * It is `false` when any value does not match `PREDICATE`
 * ```ts
 * expect(every((x) => x.length > 0, ["a", "", "ccc"])).toBe(false);
 * ```
 */
export function every<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): iterable is Iterable<S>;
export function every<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): boolean;

export function every(
  predicate: (value: unknown, index: number) => unknown,
  iterable: Iterable<unknown>
): boolean {
  let index = 0;
  for (const value of iterable) {
    if (!predicate(value, index++)) {
      return false;
    }
  }
  return true;
}
