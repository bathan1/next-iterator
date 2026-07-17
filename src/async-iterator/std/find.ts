export function find<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<S | undefined>;
export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<T | undefined>;
export async function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<T | undefined> {
  let index = 0;
  for await (const value of iterable) {
    if (predicate(value, index++)) return value;
  }
  return undefined;
}
