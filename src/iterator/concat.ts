type ConcatValue<T> = T extends Iterable<infer V> ? V : never;

/**
 * `concat(...iterables)` lazily yields every value from each iterable in order.
 */
export function* concat<T extends readonly Iterable<unknown>[]>(
  ...iterables: readonly [...T]
): Generator<ConcatValue<T[number]>, void, unknown> {
  for (const iterable of iterables) {
    yield* iterable as Iterable<ConcatValue<T[number]>>;
  }
}
