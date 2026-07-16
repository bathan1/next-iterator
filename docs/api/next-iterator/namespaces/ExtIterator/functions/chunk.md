---
title: chunk
---

# Function: chunk()

> **chunk**\<`T`\>(`limit`, `iterable`): `Generator`\<`T`[], `void`, `unknown`\>

Defined in: iterator/chunk.ts:43

`chunk(limit, iterable)` is a new generator that yields elements of `ITERABLE` materialized as arrays of max size `LIMIT`.

## Usage
```ts
const lotsOfRows = createLotsOfData();
const insertableChunks = chunk(500, lotsOfRows);
for (const chunk of insertableChunks) {
  await tx
    .insertInto("some-table")
    .values(chunk)
    .execute();
}
```

## Type Parameters

### T

`T`

## Parameters

### limit

`number`

### iterable

`Iterable`\<`T`, `unknown`, `unknown`\>

## Returns

`Generator`\<`T`[], `void`, `unknown`\>

## Examples

It yields arrays of max size `LIMIT`
```ts
function* infinite() {
  let i = 0;
  while (true) {
    yield i++;
  }
}
const limit = Math.ceil(Math.random() * 100);
const randomLength = Math.ceil(Math.random() * limit);
const iterable = randomIterableFromArray(take(randomLength, infinite()).toArray());

const chunked = Array.from(chunk(limit, iterable));
chunked.forEach((array) => expect(array.length).toBeLessThanOrEqual(limit));
```

It throws RangeError when `LIMIT` is non-positive
```ts
const limit = Math.random() < 0.5 ? -1 : -1.123;
const iterable = randomIterableFromArray([1, 2]);

const chunked = () => Array.from(chunk(limit, iterable));
expect(chunked).toThrow(RangeError);
```
