---
title: partitionMap
---

# Function: partitionMap()

> **partitionMap**\<`T`, `L`, `R`\>(`callbackfn`, `iterable`): \[`L`[], `R`[]\]

Defined in: [iterator/partitionMap.ts:27](https://github.com/bathan1/utop.js/blob/b962071d4b29e2de8a6542115e70235dff816f10/src/iterator/partitionMap.ts#L27)

`partitionMap(callbackfn, iterable)` separates `CALLBACKFN` results for `ITERABLE` into left and right values.

## Usage
```ts
const [errors, values] = partitionMap((value) => value < 0
  ? { kind: "left", value: "negative" }
  : { kind: "right", value }, [1, -1, 2]);
```

## Type Parameters

### T

`T`

### L

`L`

### R

`R`

## Parameters

### callbackfn

(`value`, `index`) => [`Either`](../type-aliases/Either.md)\<`L`, `R`\>

### iterable

`Iterable`\<`T`\>

## Returns

\[`L`[], `R`[]\]

## Example

It separates left and right result values
```ts
const result = partitionMap(
  (value): Either<string, number> =>
    value < 0
      ? ({ kind: "left", value: `invalid:${value}` } as const)
      : ({ kind: "right", value: value * 2 } as const),
  [1, -1, 2]
);
expect(result).toEqual([["invalid:-1"], [2, 4]]);
```
