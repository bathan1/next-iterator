export function findErr<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<S>;
export function findErr<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<T>;
export async function findErr<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<T> {
  let index = 0;

  for await (const value of iterable) {
    if (predicate(value, index++)) return value;
  }

  throw new RangeError("No value satisfies predicate");
}
