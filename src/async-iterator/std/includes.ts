export async function includes<T>(
  searchElement: T,
  iterable: AsyncIterable<T> | Iterable<T>,
  fromIndex: number = 0
): Promise<boolean> {
  let index = 0;
  const start = Math.max(0, fromIndex);
  for await (const value of iterable) {
    if (index >= start && (Object.is(searchElement, value) || searchElement === value)) return true;
    index++;
  }
  return false;
}
