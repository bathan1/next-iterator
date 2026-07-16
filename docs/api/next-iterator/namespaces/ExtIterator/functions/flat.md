---
title: flat
---

# Function: flat()

> **flat**\<`T`\>(`iterable`): `Generator`\<`T`, `void`, `unknown`\>

Defined in: iterator/flat.ts:22

`flat(iterable)` lazily flattens one level of nested `ITERABLE`.

## Usage
```ts
const values = [...flat([[1, 2], new Set([3, 4])])];
```

`flat` has no async sugar; materialize async input before calling it.

```ts
const values = [...flat(await Array.fromAsync(groups()))];
```

## Type Parameters

### T

`T`

## Parameters

### iterable

`Iterable`\<`Iterable`\<`T`, `any`, `any`\>\>

## Returns

`Generator`\<`T`, `void`, `unknown`\>

## Example

It flattens one level of any nested iterables
```ts
expect([...flat([[1, 2], new Set([3, 4])])]).toEqual([1, 2, 3, 4]);
```
