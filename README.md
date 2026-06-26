# utop.js
Utop.js is a "universal" top level set of helper functions that operate on
JavaScript [iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol).
It is basically the [iterator helper methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator#iterator_helper_methods)
but exposed as standalone ESM exports so you can it from the "top-level":

```ts
import { forEach } from "@/lib/utop/forEach.js";

forEach(console.log, ["Hello", "Utop", ".js", "!"])
```

You can also pass in a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set),
a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), and just about any
object that implements the Iterable Protocol.

```ts
import { forEach } from "@/lib/utop/forEach.js";

forEach(console.log, new Set(["Hello", "Utop", ".js", "!"]));
forEach(console.log, new Map([
  ["Hello", "Utop"]
  [".js", "!"]
));
forEach(console.log, function*() {
  yield "Hello";
  yield "Utop";
  yield ".js";
  yield "!";
}());
```

Utop.js takes its name from OCaml's [utop](https://github.com/ocaml-community/utop). The "data-last" API design of Utop.js's
functions was also inspired by OCaml's standard library. Standard iterator functions follow the signature:

```ts
function f(...methodArgs, iterable)
```

where `methodArgs` are the arguments for the operation `f`, and then the `iterable` is passed in last.

So for example, the `forEach` method has a type signature that looks something like:

```ts
type IteratorObject<T, TReturn, TNext> {
  forEach: (callbackfn: (value: T, index: number) => unknown): void
}
```

It looks like this in Utop.js as a "top-level" function:

```ts
export function forEach<T>(
  callbackfn: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): void;
```

I say the functions *generally* follow the original method signature because I had to make a decision regarding
the optional arguments. For example, the `reduce` method allows you to omit the initial accumulator value as
it will use the first element as the initial state when omitted:

```ts
iterable.reduce(callbackfn)
iterable.reduce(callbackfn, initialValue)
```

To stay consistent with the "data-last" API, I *could* have implemented `reduce` as an overload like so:

```ts
function reduce(callbackfn, iterable);
function reduce(callbackfn, initialValue, iterable);
function reduce(callbackfn, initialValueOrIterable, maybeIterable) {}
```

I don't like the idea of validating arguments at runtime when the arguments are trusted, so I made
the decision to make `initialValue` required, since I don't think I have ever used `reduce` without passing
in an explicit `initialValue` anyway:

```ts
export function reduce<T, U>(
  callbackfn: (acc: U, value: T, index: number) => U,
  initialValue: U,
  iterable: Iterable<T>
): U;
```

So with functions that have positional "overloads", Utop.js aims to stay faithful to the most practical overload.
Utop.js's function overloads are primarily to improve the TypeScript development experience.

Utop.js exports all of the [standard iterator helper methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator#instance_methods)
along with some extra helper functions as well. Each of them have identical names to their method counterparts and
behave exactly the same as them with the exception of `find` which throws instead of returning `undefined` when the
search element could not be found instead of returning `undefined`. Any deviations such as this will be documented
in the function's docstrings.

## Installation
The primary release channel is the GitHub repository as a `shadcn` [registry](https://ui.shadcn.com/docs/registry/github),
which assumes the following:

1. You are using TypeScript
2. You have a bundler capable of compiling `ESNext` source code

Each function is an individual registry item with the naming convention of `${FUNCTION_NAME}.js`. To add `map` for example:

```bash
pnpm dlx shadcn@latest add bathan1/utop/map.js
```

`shadcn` will take care of writing the `utop` directory to your `@lib` folder for your project (.e.g. `@/lib/utop`), which is where
all the library functions can be imported from:

```ts
import { map } from "@/lib/utop/map.js";
```

As of the time of writing, there is a [known issue](https://github.com/vercel/next.js/issues/82945) on Next.js
with importing native relative path modules. The workaround is to use the following turbopack loader.

```js
// import-rewrite-loader.cjs
module.exports = function stripRelativeJsExtensions(source) {
  return source.replaceAll(
    /(from\s+["']\.{1,2}\/[^"']*?)\.js(["'];?)$/gm,
    "$1$2",
  );
};
```

Which you then add to your `next.config.ts` file:

```ts
import type { NextConfig } from "next";

const config: NextConfig = {
  ...,
  turbopack: {
    rules: {
      "*.ts": [
        {
          loaders: ["./import-rewrite-loader.cjs"],
        },
      ],
      "*.tsx": [
        {
          loaders: ["./import-rewrite-loader.cjs"],
        },
      ],
    },
  },
}
```

You can simply copy and paste the js script from above or use the
registry item that places it in your project's root:

```bash
pnpm dlx shadcn@latest add bathan1/utop/import-rewrite-loader.cjs
```

And that's it!

### Manual Installation
There is no official Utop.js `npm` release, but you can still use its functions even if your project
doesn't use `shadcn`. Since Utop.js has no dependencies, you can simply copy and paste the source code
yourself and it will "just work" on TypeScript projects.

The benefit of this approach is you have greater control over where to place your files. The drawback is that
for functions that depend on other functions in the library (i.e. `import` them), you will need to manually handle
copy + pasting them as well. All of the source files can be found under the [`src/`](./src) directory.

> And since there is no `npm` release, vanilla JavaScript projects will need to transpile the typescript source code themselves,
so you might want to reconsider if adding this to your vanilla project is worth it or not (though the lack of dependencies should
make this doable if you really needed to).
