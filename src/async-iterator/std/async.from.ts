/**
 * `from(iterable)` returns `ITERABLE`'s async iterator.
 */
export function from<T>(iterable: AsyncIterable<T>): AsyncIterator<T, void, unknown>;
export function from<T>(iterable: Iterable<T>): AsyncIterator<Awaited<T>, void, unknown>;
export function from<T>(
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncIterator<Awaited<T>, void, unknown> {
  if (Symbol.asyncIterator in iterable) {
    return iterable[Symbol.asyncIterator]() as AsyncIterator<Awaited<T>, void, unknown>;
  }

  return (async function* from() {
    yield* iterable;
  })();
}
