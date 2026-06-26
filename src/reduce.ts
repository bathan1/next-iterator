/**
 * `reduce(callbackfn, initialValue, iterable)` folds `ITERABLE` into shape of `INITIAL_VALUE` by threading each element in `ITERABLE` through the reducer `CALLBACKFN`.
 * 
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/reduce.js
 * ```
 * 
 * ### Usage
 * ```ts
 * import { reduce } from "@/lib/utop/find.js";
 * ```
 * 
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos as { todo: string }[]);
 * 
 * const lines = reduce((acc, todoItem) => {
 *   return acc + `${todoItem.todo}\n`
 * }, "", todos);
 * console.log(lines);
 * ```
 * 
 * ### Examples
 * 
 * @example
 * It folds `ITERABLE` into `INITIAL_VALUE`
 * ```ts
 * expect(reduce((sum, x) => sum + x, 0, [1, 2, 3])).toBe(6);
 * ```
 * 
 * @example
 * It passes the index to `CALLBACKFN`
 * ```ts
 * expect(reduce((acc, x, i) => [...acc, `${i}:${x}`], [] as string[], ["a", "b"])).toEqual([
 *   "0:a",
 *   "1:b",
 * ]);
 * ```
 */
export function reduce<T, U>(
  callbackfn: (acc: U, value: T, index: number) => U,
  initialValue: U,
  iterable: Iterable<T>
): U {
  let acc = initialValue;
  let index = 0;

  for (const value of iterable) {
    acc = callbackfn(acc, value, index++);
  }

  return acc;
}
