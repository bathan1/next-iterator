---
title: perform
description: perform(iterator) consumes ITERATOR and returns its final return value.
---

# perform

`perform(iterator)` consumes `ITERATOR` and returns its final return value.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/perform
```

## Usage
```ts
function* work() { yield "working"; return "done"; }
const result = perform(work());
```

`perform` has no async sugar; consume an async iterator with `for await`.

```ts
for await (const event of events()) console.log(event);
```

## Examples

It consumes an iterator and returns its final value
```ts
function* work() {
  yield "first";
  yield "second";
  return "done";
}
expect(perform(work())).toBe("done");
```

## API Reference

> **perform**\<`T`, `R`\>(`iterator`): `R`

Defined in: [perform.ts:27](https://github.com/bathan1/utop.js/blob/e64f61e6061ac2c61e2caf3dd777f244debf6a43/src/perform.ts#L27)

### Type Parameters

#### T

`T`

#### R

`R`

### Parameters

#### iterator

`Iterator`\<`T`, `R`, `unknown`\> \| `Iterable`\<`T`, `R`, `unknown`\>

### Returns

`R`
