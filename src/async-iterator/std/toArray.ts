/**
 * `toArray(iterable)` eagerly materializes `ITERABLE` into an array.
 */
export async function toArray<T>(iterable: AsyncIterable<T> | Iterable<T>): Promise<Awaited<T>[]> {
  const values: Awaited<T>[] = [];
  for await (const value of iterable) {
    values.push(value);
  }
  return values;
}
