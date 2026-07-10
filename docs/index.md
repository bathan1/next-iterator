<!-- Generated from README.md by scripts/prepare-docs.mjs. -->

# Next Iterator
Next Iterator or `next-it` is an alternative implementation of the
[Iterator Helper Methods](https://github.com/tc39/proposal-iterator-helpers).

<<< ../examples/dummy-json/completed-todos-content.ts

It follows a "data-last" convention where functions accept the iterable in their *last* argument:

```ts
Iterator.map(callbackfn, iterable);
```

The library handles overriding the type of native [`.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
where needed so you can compose typesafe functions with it:

<<< ../examples/dummy-json/typesafe-bind.ts

The trade-off with this approach is that you need to pass
in `ITERABLE` before `CALLBACKFN` to get TypeScript
intellisense for inline `CALLBACKFN`:

```ts
// Bad: 'todo' is unknown
Iterator.map(todo => todo.id); // and then pass in 'todos'

// Good: now TypeScript knows how to type the callback
Iterator.map(, todos); // and then pass callback
```

## Usage
Next Iterator is distributed as a shadcn registry item, so you will need
a [components.json](https://ui.shadcn.com/docs/components-json) at a minimum if
your project doesn't already use shadcn.

The primary API is the userland `Iterator` object that acts as a drop-in replacement for
the global `Iterator` (*without* polyfilling it).

```bash
npx shadcn@latest add bathan1/next-it/iterator.js # The .js is part of the name!
```

This will plaster the contents of `./src/iterator.ts` into your `@lib` path by default:

```ts
import { Iterator } from "@/lib/iterator";
```

And that's it!

### Async Iterator
Although there is no official spec for an async version of the iterator helper methods, Next Iterator provides one anyway:

```bash
npx shadcn@latest add bathan1/next-it/async-iterator.js
```

```ts
import { AsyncIterator } from "@/lib/async-iterator";
```

It exposes the exact same set of "standard" helper methods as `Iterator`. For the methods that accept a callback function,
Promises will be flattened with the exception of predicate functions. This is to maintain the standard behavior
where anything that is 'truthy' counts as true for these functions (e.g. [`filter`](https://github.com/bathan1/next-it/blob/main/src/async-iterator/async.filter.ts)).

### Extras
Next Iterator also ships [extra helper functions](https://github.com/bathan1/next-it/blob/main/src/ext-iterator/). They are exposed as standalone
registry items with item names following the template: `ext/{function}.js`.

```bash
npx shadcn@latest add bathan1/next-it/ext/chunk.js
```

These functions are written to `@/lib/ext-iterator` by default.

```ts
import { chunk } from "@/lib/ext-iterator/chunk"
```

They are all synchronous functions. If they have an async counterpart, then their item names follow the
template: `ext/async.{function}.js`:

```bash
npx shadcn@latest add bathan1/next-it/ext/async.chunk.js
```

They are written to `@/lib/ext-iterator` directory by default as well:

```ts
import { chunk } from "@/lib/ext-iterator/async.chunk"
```

Although `Iterator` and `AsyncIterator` both do not come with these extra methods attached,
you can attach them yourself in your source code:

```ts
// @/lib/iterator.ts
import { zip } from "./iterator/zip.js";

// ...

import { chunk } from "./ext-iterator/chunk.js";

export const Iterator = Object.freeze({
  chunk
});
```

It's *your* code, after all.
