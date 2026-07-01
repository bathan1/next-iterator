---
title: flat
description: flat(iterable) lazily flattens one level of nested ITERABLE.
---

# flat

`flat(iterable)` lazily flattens one level of nested `ITERABLE`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/flat
```

## Usage
```ts
const values = [...flat([[1, 2], new Set([3, 4])])];
```

`flat` has no async sugar; materialize async input before calling it.

```ts
const values = [...flat(await Array.fromAsync(groups()))];
```

## Examples

It flattens one level of any nested iterables
```ts
expect([...flat([[1, 2], new Set([3, 4])])]).toEqual([1, 2, 3, 4]);
```

## API Reference

> **flat**\<`T`\>(`iterable`): `Generator`\<`T`, `void`, `unknown`\>

Defined in: [flat.ts:22](https://github.com/bathan1/utop.js/blob/94e39a8d2ef5a05d48ea2a9901012d95a93e96b9/src/flat.ts#L22)

### Type Parameters

#### T

`T`

### Parameters

#### iterable

`Iterable`\<`Iterable`\<`T`, `any`, `any`\>\>

### Returns

`Generator`\<`T`, `void`, `unknown`\>
