export function partition<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<[matches: S[], rest: Exclude<T, S>[]]>;
export function partition<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T> | Iterable<T>
): Promise<[matches: T[], rest: T[]]>;
export async function partition(
  predicate: (value: unknown, index: number) => unknown,
  iterable: AsyncIterable<unknown> | Iterable<unknown>
): Promise<[matches: unknown[], rest: unknown[]]> {
  let index = 0;
  const matches: unknown[] = [];
  const rest: unknown[] = [];
  for await (const value of iterable) {
    (predicate(value, index++) ? matches : rest).push(value);
  }
  return [matches, rest];
}
