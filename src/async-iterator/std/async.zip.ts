type AsyncZipInput<T> = Iterable<T> | AsyncIterable<T>;
type AsyncZipValue<T> =
  T extends AsyncIterable<infer V> ? Awaited<V> :
  T extends Iterable<infer V> ? Awaited<V> :
  never;

type AsyncZipMode = "shortest" | "longest" | "strict";

type AsyncZipOptions = {
  mode?: AsyncZipMode;
  padding?: AsyncZipInput<unknown>;
};

type AsyncZipPadding<O extends AsyncZipOptions | undefined> = O extends {
  padding: infer P extends AsyncZipInput<unknown>;
}
  ? AsyncZipValue<P>
  : undefined;

type AsyncZipOutput<T extends readonly AsyncZipInput<unknown>[]> = {
  -readonly [K in keyof T]: AsyncZipValue<T[K]>;
};

type AsyncZipOutputLongest<T extends readonly AsyncZipInput<unknown>[], P> = {
  -readonly [K in keyof T]: AsyncZipValue<T[K]> | P;
};

async function asyncIterator<T>(iterable: AsyncZipInput<T>): Promise<AsyncIterator<Awaited<T>>> {
  if (Symbol.asyncIterator in iterable) {
    return iterable[Symbol.asyncIterator]() as AsyncIterator<Awaited<T>>;
  }

  return (async function* iterator() {
    yield* iterable;
  })();
}

/**
 * `zip(iterables, options?)` yields zip-aggregated awaited elements from `ITERABLES`.
 */
export async function* zip<
  T extends readonly AsyncZipInput<unknown>[],
  O extends AsyncZipOptions | undefined = undefined,
>(
  iterables: readonly [...T],
  options?: O
): AsyncGenerator<
  O extends { mode: "longest" }
    ? AsyncZipOutputLongest<T, AsyncZipPadding<O>>
    : AsyncZipOutput<T>,
  void,
  unknown
> {
  const mode = options?.mode ?? "shortest";
  const iterators = await Promise.all(iterables.map((iterable) => asyncIterator(iterable)));
  const paddingIterator = options?.padding ? await asyncIterator(options.padding) : undefined;

  while (true) {
    const results = await Promise.all(iterators.map((it) => it.next()));
    const doneCount = results.filter((result) => result.done).length;

    if (doneCount === iterators.length) {
      return;
    }

    if (doneCount > 0) {
      if (mode === "shortest") {
        return;
      }

      if (mode === "strict") {
        throw new TypeError("Cannot zip iterables with different lengths");
      }
    }

    const row = [];
    for (const result of results) {
      row.push(result.done ? (await paddingIterator?.next())?.value : result.value);
    }

    yield row as O extends { mode: "longest" }
      ? AsyncZipOutputLongest<T, AsyncZipPadding<O>>
      : AsyncZipOutput<T>;
  }
}
