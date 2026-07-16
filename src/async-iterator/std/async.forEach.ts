export async function forEach<T>(
  callbackfn: (value: T, index: number) => unknown | Promise<unknown>,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<void> {
  let index = 0;
  for await (const value of iterable) {
    void (await callbackfn(value, index++));
  }
}
