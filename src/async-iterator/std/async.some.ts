export async function some<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<boolean> {
  let index = 0;
  for await (const value of iterable) {
    if (predicate(value, index++)) return true;
  }
  return false;
}
