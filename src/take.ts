/**
 * `take(limit, iterable)` is the new sequence that takes `LIMIT` elements from `ITERABLE` when `LIMIT` is non-negative
 * or throws {@link RangeError} otherwise when `LIMIT` is negative or `NaN`.
 * 
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/take.js
 * ```
 * 
 * ### Usage
 * ```ts
 * import { take } from "@/lib/utop/take.js";
 * ```
 * 
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos));
 * 
 * const first5 = take(5, todos);
 * for (const todo of first5) {
 *   console.log(todo);
 * }
 * ```
 * 
 * ### Examples
 * 
 * @example
 * It takes at most LIMIT values from ITERABLE
 * ```ts
 * expect(Array.from(take(2, ["a", "b", "c"]))).toEqual(["a", "b"]);
 * ```
 * 
 * @example
 * It stops when ITERABLE ends before LIMIT
 * ```ts
 * expect(Array.from(take(5, ["a", "b"]))).toEqual(["a", "b"]);
 * ```
 * 
 * @example
 * It throws when LIMIT is negative and NaN
 * ```ts
 * expect(() => Array.from(take(-1, ["a", "b"]))).toThrow(RangeError);
 * expect(() => Array.from(take(NaN, ["a", "b"]))).toThrow(RangeError);
 * ```
 */
export function* take<T>(limit: number, iterable: Iterable<T>): Generator<T, void, unknown> {
  if (Number.isNaN(limit) || limit < 0) {
    throw new RangeError("LIMIT must be nonnegative", { cause: limit });
  }

  const it = iterable[Symbol.iterator]();
  for (let i = 0; i < limit; i++) {
    const { done, value } = it.next();
    if (done) {
      return void 0;
    }
    yield value;
  }
}
