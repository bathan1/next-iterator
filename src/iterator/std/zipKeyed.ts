type ZipKeyedValue<T> = T extends Iterable<infer V> ? V : never;

type ZipKeyedMode = "shortest" | "longest" | "strict";

type ZipKeyedOptions<T extends Record<string, Iterable<unknown>>> = {
  mode?: ZipKeyedMode;
  padding?: Partial<{ [K in keyof T]: unknown }>;
};

type ZipKeyedOutput<T extends Record<string, Iterable<unknown>>> = {
  [K in keyof T]: ZipKeyedValue<T[K]>;
};

type ZipKeyedOutputLongest<
  T extends Record<string, Iterable<unknown>>,
  O extends ZipKeyedOptions<T> | undefined,
> = {
  [K in keyof T]: ZipKeyedValue<T[K]> | (O extends { padding: infer P } ? P[keyof P] : undefined);
};

/**
 * `zipKeyed(iterables, options?)` yields objects whose values are pulled from matching keyed iterables.
 */
export function* zipKeyed<
  T extends Record<string, Iterable<unknown>>,
  O extends ZipKeyedOptions<T> | undefined = undefined,
>(
  iterables: T,
  options?: O
): Generator<
  O extends { mode: "longest" } ? ZipKeyedOutputLongest<T, O> : ZipKeyedOutput<T>,
  void,
  unknown
> {
  const mode = options?.mode ?? "shortest";
  const keys = Object.keys(iterables) as (keyof T & string)[];
  const iterators = Object.fromEntries(
    keys.map((key) => [key, iterables[key]![Symbol.iterator]()])
  ) as { [K in keyof T & string]: Iterator<ZipKeyedValue<T[K]>, unknown, unknown> };

  while (true) {
    const entries = keys.map((key) => [key, iterators[key].next()] as const);
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
    ) as O extends { mode: "longest" } ? ZipKeyedOutputLongest<T, O> : ZipKeyedOutput<T>;
  }
}
