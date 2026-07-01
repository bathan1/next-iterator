---
title: Option
---

# Function: Option()

> **Option**\<`T`\>(`value`): [`Option`](../type-aliases/Option.md)\<`NonNullable`\<`T`\>\>

Defined in: [types.ts:16](https://github.com/bathan1/utop.js/blob/94e39a8d2ef5a05d48ea2a9901012d95a93e96b9/src/types.ts#L16)

## Type Parameters

### T

`T`

## Parameters

### value

`T` \| `null` \| `undefined`

## Returns

[`Option`](../type-aliases/Option.md)\<`NonNullable`\<`T`\>\>

## Example

It coerces null VALUE to undefined
```ts
expect(Option(null)).not.toEqual(null);
expect(Option(null)).toEqual(undefined);
```
