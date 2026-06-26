/**
 * `forEach(callbackfn, iterable)` calls `CALLBACKFN` on each element in `ITERABLE` *immediately* and returns nothing
 * 
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/forEach.js
 * ```
 * 
 * ### Usage
 * ```ts
 * import { forEach } from "@/lib/utop/forEach.js";
 * ```
 * 
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos);
 * 
 * forEach(console.log, todos);
 * ```
 * 
 * ### Examples
 * 
 * @example
 * It immediately consumes the iterable
 * ```ts
 * const iterable = [1, 2, 3].values();
 * forEach(() => void 0, iterable);
 * ```
 */
export function forEach<T>(
  callbackfn: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): void {
  let index = 0;
  for (const value of iterable) {
    void callbackfn(value, index++);
  }
}
