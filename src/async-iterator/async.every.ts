export function every<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<boolean>;
export function every<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<boolean>;
export async function every<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<boolean> {
  let index = 0;
  for await (const value of iterable) {
    if (!predicate(value, index++)) return false;
  }
  return true;
}
