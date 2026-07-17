type BoundMap<T, U> = {
  (iterable: AsyncIterable<T> | Iterable<T>): AsyncGenerator<Awaited<U>, void, unknown>;
};

type Map = {
  <T, U>(
    callbackfn: (value: T, index: number) => U | Promise<U>,
    iterable: AsyncIterable<T> | Iterable<T>
  ): AsyncGenerator<Awaited<U>, void, unknown>;

  bind<T, U>(
    this: Map,
    thisArg: null,
    callbackfn: (value: T, index: number) => U | Promise<U>
  ): BoundMap<T, U>;
};

export const map: Map = (async function* map<T, U>(
  callbackfn: (value: T, index: number) => U | Promise<U>,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncGenerator<Awaited<U>, void, unknown> {
  let index = 0;
  for await (const value of iterable) {
    yield await callbackfn(value, index++);
  }
}) as Map;
