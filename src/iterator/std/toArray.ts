/**
 * `toArray(iterable)` eagerly materializes `ITERABLE` into an array.
 */
export function toArray<T>(iterable: Iterable<T>): T[] {
  return Array.from(iterable);
}
