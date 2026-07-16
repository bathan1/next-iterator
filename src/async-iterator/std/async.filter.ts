export function filter<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncGenerator<S, void, unknown>;
export function filter<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncGenerator<T, void, unknown>;
export async function* filter<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncGenerator<T, void, unknown> {
  let index = 0;
  for await (const value of iterable) {
    if (predicate(value, index++)) yield value;
  }
}
