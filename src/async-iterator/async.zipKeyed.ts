type AsyncZipKeyedInput<T> = Iterable<T> | AsyncIterable<T>;
type AsyncZipKeyedValue<T> =
  T extends AsyncIterable<infer V> ? Awaited<V> :
  T extends Iterable<infer V> ? Awaited<V> :
  never;

type AsyncZipKeyedMode = "shortest" | "longest" | "strict";

type AsyncZipKeyedOptions<T extends Record<string, AsyncZipKeyedInput<unknown>>> = {
  mode?: AsyncZipKeyedMode;
  padding?: Partial<{ [K in keyof T]: unknown }>;
};

type AsyncZipKeyedOutput<T extends Record<string, AsyncZipKeyedInput<unknown>>> = {
  [K in keyof T]: AsyncZipKeyedValue<T[K]>;
};

type AsyncZipKeyedOutputLongest<
  T extends Record<string, AsyncZipKeyedInput<unknown>>,
  O extends AsyncZipKeyedOptions<T> | undefined,
> = {
  [K in keyof T]: AsyncZipKeyedValue<T[K]> | (O extends { padding: infer P } ? P[keyof P] : undefined);
};

async function asyncIterator<T>(
  iterable: AsyncZipKeyedInput<T>
): Promise<AsyncIterator<Awaited<T>>> {
  if (Symbol.asyncIterator in iterable) {
    return iterable[Symbol.asyncIterator]() as AsyncIterator<Awaited<T>>;
  }

  return (async function* iterator() {
    yield* iterable;
  })();
}

/**
 * `zipKeyed(iterables, options?)` yields keyed objects from awaited matching iterables.
 */
export async function* zipKeyed<
  T extends Record<string, AsyncZipKeyedInput<unknown>>,
  O extends AsyncZipKeyedOptions<T> | undefined = undefined,
>(
  iterables: T,
  options?: O
): AsyncGenerator<
  O extends { mode: "longest" } ? AsyncZipKeyedOutputLongest<T, O> : AsyncZipKeyedOutput<T>,
  void,
  unknown
> {
  const mode = options?.mode ?? "shortest";
  const keys = Object.keys(iterables) as (keyof T & string)[];
  const iteratorEntries = await Promise.all(
    keys.map(async (key) => [key, await asyncIterator(iterables[key]!)] as const)
  );
  const iterators = Object.fromEntries(iteratorEntries) as {
    [K in keyof T & string]: AsyncIterator<AsyncZipKeyedValue<T[K]>, unknown, unknown>;
  };

  while (true) {
    const entries = await Promise.all(
      keys.map(async (key) => [key, await iterators[key].next()] as const)
    );
    const doneCount = entries.filter(([, result]) => result.done).length;

    if (doneCount === keys.length) {
      return;
    }

    if (doneCount > 0) {
      if (mode === "shortest") {
        return;
      }

      if (mode === "strict") {
        throw new TypeError("Cannot zip keyed iterables with different lengths");
      }
    }

    yield Object.fromEntries(
      entries.map(([key, result]) => [
        key,
        result.done ? options?.padding?.[key] : result.value,
      ])
    ) as O extends { mode: "longest" } ? AsyncZipKeyedOutputLongest<T, O> : AsyncZipKeyedOutput<T>;
  }
}
