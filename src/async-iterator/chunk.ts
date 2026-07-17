export async function* chunk<T>(
  limit: number,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncGenerator<T[], void, unknown> {
  if (limit <= 0) {
    throw new RangeError("chunk LIMIT must be greater than 0", {
      cause: limit,
    });
  }

  let chunk: T[] = [];

  for await (const x of iterable) {
    chunk.push(x);

    if (chunk.length >= limit) {
      yield chunk;
      chunk = [];
    }
  }

  if (chunk.length) {
    yield chunk;
  }
}
