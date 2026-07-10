export async function reduce<T, U>(
  callbackfn: (acc: Awaited<U>, value: T, index: number) => U | Promise<U>,
  initialValue: U,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<Awaited<U>> {
  let acc = await initialValue;
  let index = 0;
  for await (const value of iterable) {
    acc = await callbackfn(acc, value, index++);
  }
  return acc;
}
