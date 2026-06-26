/**
 * `Option<T>` is `T` unioned with `undefined`
 */
export type Option<T> = T | undefined;
export type Some<T> = NonNullable<T>;
export type None = undefined;
export const None: undefined = undefined;

/**
 * `Promisable<T>` is either `T` itself or a {@link Promise} of `T`
 */
export type Promisable<T> = T | Promise<T>;
