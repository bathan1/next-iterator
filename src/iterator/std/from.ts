/**
 * `from(iterable)` returns `ITERABLE`'s iterator.
 */
export function from<T>(iterable: Iterable<T>): Iterator<T, undefined, unknown> {
  return iterable[Symbol.iterator]();
}
