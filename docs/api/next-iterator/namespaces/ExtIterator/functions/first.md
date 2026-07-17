---
title: first
---

# Function: first()

> **first**\<`T`\>(`iterable`): `T` \| `undefined`

Defined in: [iterator/first.ts:27](https://github.com/bathan1/utop.js/blob/01fe8ef63ad92516bfa781da53e79a5dab117ba4/src/iterator/first.ts#L27)

`first(iterable)` returns the first value of `ITERABLE`, or `undefined`
if `ITERABLE` is empty.

## Usage
```ts
const firstTodo = first([
  { todo: "Buy milk" },
  { todo: "Walk dog" },
]);

console.log(firstTodo?.todo);
```

## Type Parameters

### T

`T`

## Parameters

### iterable

`Iterable`\<`T`\>

## Returns

`T` \| `undefined`

## Examples

It returns the first value from an iterable
```ts
expect(first(["foo", "bar", "baz"])).toBe("foo");
```

It returns undefined when the iterable is empty
```ts
expect(first([])).toBeUndefined();
```
