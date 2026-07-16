type AsyncConcatInput<T> = Iterable<T> | AsyncIterable<T>;
type AsyncConcatValue<T> =
  T extends AsyncIterable<infer V> ? Awaited<V> :
  T extends Iterable<infer V> ? Awaited<V> :
  never;

/**
 * `concat(...iterables)` lazily yields every awaited value from each iterable in order.
 */
export async function* concat<T extends readonly AsyncConcatInput<unknown>[]>(
  ...iterables: readonly [...T]
): AsyncGenerator<AsyncConcatValue<T[number]>, void, unknown> {
  for (const iterable of iterables) {
    yield* iterable as AsyncConcatInput<AsyncConcatValue<T[number]>>;
  }
}
