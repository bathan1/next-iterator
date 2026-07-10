---
title: orderBy
---

# Function: orderBy()

> **orderBy**\<`T`, `Keys`\>(`keys`, `direction`, `iterable`): `T`[]

Defined in: [ext-iterator/orderBy.ts:43](https://github.com/bathan1/utop.js/blob/bdc3f98b8e61139cc46ddf4c6d96ebfa7966f602/src/ext-iterator/orderBy.ts#L43)

`orderBy(keys, direction, iterable)` returns `ITERABLE` ordered by `KEYS` in `DIRECTION`.

## Usage
```ts
const ranked = orderBy(["score"], "desc", players);
```

`orderBy` has no async sugar; materialize async input before calling it.

```ts
const ranked = orderBy(["score"], "desc", await Array.fromAsync(players()));
```

## Type Parameters

### T

`T`

### Keys

`Keys` *extends* `ComparableKeyOf`\<`T`\>[]

## Parameters

### keys

`Keys`

### direction

`"asc"` \| `"desc"`

### iterable

`Iterable`\<`T`\>

## Returns

`T`[]

## Example

It sorts by later keys when earlier keys are equal
```ts
const rows = [
  { group: "b", score: 1 },
  { group: "a", score: 2 },
  { group: "a", score: 1 },
];
expect(orderBy(["group", "score"], "asc", rows)).toEqual([
  { group: "a", score: 1 },
  { group: "a", score: 2 },
  { group: "b", score: 1 },
]);
```
