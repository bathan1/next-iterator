export type Option<T> = T | undefined;

export type Promisable<T> = T | Promise<T>;

/**
 * `Either<L, R>` is values of types `L` boxed in a `"left"` disciminateable
 * object and `R` boxed in `"right"` kinds.
 */
export type Either<L, R> = { kind: "left"; value: L } | { kind: "right"; value: R };

export type Prettify<A> = {
  [Key in keyof A]: A[Key];
} & {};
export type Merge<A, B> = Prettify<Omit<A, keyof B> & B>;
