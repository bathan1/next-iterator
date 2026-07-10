export async function* take<T>(
  limit: number,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncGenerator<T, void, unknown> {
  if (Number.isNaN(limit) || limit < 0) {
    throw new RangeError("LIMIT must be nonnegative", { cause: limit });
  }

  let index = 0;
  for await (const value of iterable) {
    if (index++ >= limit) return;
    yield value;
  }
}
