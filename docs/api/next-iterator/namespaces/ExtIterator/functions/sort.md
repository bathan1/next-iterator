---
title: sort
---

# Function: sort()

> **sort**\<`T`\>(`compareFn`, `iterable`): `T`[]

Defined in: [iterator/sort.ts:25](https://github.com/bathan1/utop.js/blob/01fe8ef63ad92516bfa781da53e79a5dab117ba4/src/iterator/sort.ts#L25)

`sort(compareFn, iterable)` returns `ITERABLE` as a new array sorted by `COMPAREFN`.

## Usage
```ts
const ascending = sort((a, b) => a - b, [3, 1, 2]);
```

`sort` has no async sugar; materialize async input before calling it.

```ts
const ascending = sort((a, b) => a - b, await Array.fromAsync(values()));
```

## Type Parameters

### T

`T`

## Parameters

### compareFn

(`a`, `b`) => `number`

### iterable

`Iterable`\<`T`\>

## Returns

`T`[]

## Example

It returns a new sorted array without changing the source
```ts
const source = [3, 1, 2];
expect(sort((a, b) => a - b, source)).toEqual([1, 2, 3]);
expect(source).toEqual([3, 1, 2]);
```
