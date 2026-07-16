/**
 * `some(predicate, iterable)` reports whether any value in `ITERABLE` satisfies `PREDICATE`.
 *
 * ## Usage
 * ```ts
 * const hasOverdue = some((invoice) => invoice.overdue, invoices);
 * ```
 *
 * @example
 * It short-circuits when a value satisfies `PREDICATE`
 * ```ts
 * expect(some((value) => value > 2, [1, 2, 3, 4])).toBe(true);
 * expect(some((value) => value > 4, [1, 2, 3, 4])).toBe(false);
 * ```
 */
export function some<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): boolean;
export function some<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): boolean {
  let index = 0;
  for (const value of iterable) {
    if (predicate(value, index++)) return true;
  }
  return false;
}
