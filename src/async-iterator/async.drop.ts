export async function* drop<T>(
  limit: number,
  iterable: AsyncIterable<T>
): AsyncGenerator<T, void, unknown> {
  const it = iterable[Symbol.asyncIterator]();
  for (let i = 0; i < limit; i++) {
    const { done } = await it.next();
    if (done) return void 0;
  }

  while (true) {
    const { done, value } = await it.next();
    if (done) return void 0;
    yield value;
  }
}
