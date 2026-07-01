---
title: some
description: some(predicate, iterable) reports whether any value in ITERABLE satisfies PREDICATE.
---

# some

`some(predicate, iterable)` reports whether any value in `ITERABLE` satisfies `PREDICATE`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/some
```

## Usage
```ts
const hasOverdue = some((invoice) => invoice.overdue, invoices);
```

For an async `ITERABLE`, `some` returns a Promise and awaits `PREDICATE`.

```ts
const hasOverdue = await some(async (invoice) => isOverdue(invoice), invoices());
```

## Examples

It short-circuits when a value satisfies `PREDICATE`
```ts
expect(some((value) => value > 2, [1, 2, 3, 4])).toBe(true);
expect(some((value) => value > 4, [1, 2, 3, 4])).toBe(false);
```

It awaits `PREDICATE` when `ITERABLE` is async
```ts
async function* values() {
  yield 1;
  yield 2;
  yield 3;
}
expect(await some(async (value) => value === 2, values())).toBe(true);
```

## API Reference

### Call Signature

> **some**\<`T`\>(`predicate`, `iterable`): `Promise`\<`boolean`\>

Defined in: [some.ts:35](https://github.com/bathan1/utop.js/blob/e64f61e6061ac2c61e2caf3dd777f244debf6a43/src/some.ts#L35)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`Promise`\<`boolean`\>

### Call Signature

> **some**\<`T`\>(`predicate`, `iterable`): `boolean`

Defined in: [some.ts:39](https://github.com/bathan1/utop.js/blob/e64f61e6061ac2c61e2caf3dd777f244debf6a43/src/some.ts#L39)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`Iterable`\<`T`\>

#### Returns

`boolean`
