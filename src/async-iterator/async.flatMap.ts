type FlatMapResult<T> = Iterable<T> | AsyncIterable<T>;

export async function* flatMap<T, U>(
  callbackfn: (value: T, index: number) => FlatMapResult<U> | Promise<FlatMapResult<U>>,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncGenerator<Awaited<U>, void, unknown> {
  let index = 0;
  for await (const value of iterable) {
    yield* await callbackfn(value, index++);
  }
}
