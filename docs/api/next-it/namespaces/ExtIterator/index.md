---
title: ExtIterator
---

# ExtIterator

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [Either](type-aliases/Either.md) | `Either<L, R>` is values of types `L` boxed in a `"left"` disciminateable object and `R` boxed in `"right"` kinds. |
| [Merge](type-aliases/Merge.md) | - |
| [Option](type-aliases/Option.md) | - |
| [Prettify](type-aliases/Prettify.md) | - |
| [Promisable](type-aliases/Promisable.md) | - |

## Functions

| Function | Description |
| ------ | ------ |
| [chunk](functions/chunk.md) | `chunk(limit, iterable)` is a new generator that yields elements of `ITERABLE` materialized as arrays of max size `LIMIT`. |
| [filterMap](functions/filterMap.md) | `filterMap(callbackfn, iterable)` lazily yields each defined `CALLBACKFN` result for `ITERABLE`. |
| [findErr](functions/findErr.md) | `findErr(predicate, iterable)` returns the first value in `ITERABLE` matching `PREDICATE` or throws RangeError if no such value is found. |
| [findMap](functions/findMap.md) | `findMap(callbackfn, iterable)` returns the first defined `CALLBACKFN` result from `ITERABLE`. |
| [first](functions/first.md) | `first(iterable)` returns the first value of `ITERABLE`, or `undefined` if `ITERABLE` is empty. |
| [flat](functions/flat.md) | `flat(iterable)` lazily flattens one level of nested `ITERABLE`. |
| [join](functions/join.md) | `join(separator, iterable, toString?)` joins `ITERABLE` with `SEPARATOR`, applying `TO_STRING` when provided. |
| [orderBy](functions/orderBy.md) | `orderBy(keys, direction, iterable)` returns `ITERABLE` ordered by `KEYS` in `DIRECTION`. |
| [partition](functions/partition.md) | `partition(predicate, iterable)` splits `ITERABLE` by `PREDICATE` into matching and non-matching values. |
| [partitionMap](functions/partitionMap.md) | `partitionMap(callbackfn, iterable)` separates `CALLBACKFN` results for `ITERABLE` into left and right values. |
| [perform](functions/perform.md) | `perform(iterator)` consumes `ITERATOR` and returns its final return value. |
| [sort](functions/sort.md) | `sort(compareFn, iterable)` returns `ITERABLE` as a new array sorted by `COMPAREFN`. |
| [sortUniq](functions/sortUniq.md) | `sortUniq(compareFn, iterable)` sorts `ITERABLE` with `COMPAREFN` and removes comparator-equal neighbors. |
