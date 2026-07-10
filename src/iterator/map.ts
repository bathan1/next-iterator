type BoundMap<T, U> = {
  (iterable: Iterable<T>): Generator<U, void, unknown>;
};

/**
 * We have to type out `map` explicitly if we want to get nice type inference with `.bind`
 */
type Map = {
  <T, U>(
    callbackfn: (value: T, index: number) => U,
    iterable: Iterable<T>
  ): Generator<U, void, unknown>;

  bind<T, U>(this: Map, thisArg: null, callbackfn: (value: T, index: number) => U): BoundMap<T, U>;
};

/**
 * `map(callbackfn, iterable)` is `CALLBACKFN(x1), CALLBACKFN(x2), ..., CALLBACKFN(xn)` for each `xi` in `ITERABLE`.
 *
 * ## Usage
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos as { todo: string; }[]);
 * const todosTexts = map((todoItem) => todoItem.todo, todos);
 * ```
 *
 * ## Compile Time `bind`
 * You can call the {@link map.bind} method which manually overloads the generics
 * for you so you can do partial applications against `CALLBACKFN`
 * without tsc screaming at you.
 *
 * ```ts
 * const doubleText = map.bind(null, (x: number) => String(x * 2));
 * console.log(doubleText([1, 2, 3]))
 * console.log(doubleText([2, 4, 6]))
 * ```
 *
 * @example
 * It calls `CALLBACKFN` on demand
 * ```ts
 * const callbackfn = vi.fn((x: number) => String(x * 2));
 * const iterable = randomIterableFromArray(
 *   Array.from({ length: Math.ceil(Math.random() * 100) }, (_, i) => i)
 * );
 * const mapped = map(callbackfn, iterable);
 *
 * expect(callbackfn).not.toHaveBeenCalled();
 * mapped.next();
 * expect(callbackfn).toHaveBeenCalled();
 * callbackfn.mockClear();
 * ```
 * @example
 * It partially applies `CALLBACK_FN` through native `.bind`
 * ```ts
 * function double(x: number) {
 *   return x * 2;
 * }
 * const doubleNumbers = map.bind(null, double);
 *
 * const result = Array.from(doubleNumbers([1, 2, 3]));
 * expect(result).toEqual([2, 4, 6]);
 * ```
 */
export const map: Map = (<T, U>(
  callbackfn: (value: T, index: number) => U,
  iterable: Iterable<T>
): Generator<U, void, unknown> => {
  return (function* map() {
    let index = 0;
    for (const value of iterable) {
      yield callbackfn(value, index++);
    }
  })();
}) as Map;
