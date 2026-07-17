export async function first<T>(
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<T | undefined> {
  for await (const value of iterable) {
    return value;
  }

  return undefined;
}
