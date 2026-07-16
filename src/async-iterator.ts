import { concat } from "./async-iterator/std/async.concat.js";
import { drop } from "./async-iterator/std/async.drop.js";
import { every } from "./async-iterator/std/async.every.js";
import { filter } from "./async-iterator/std/async.filter.js";
import { find } from "./async-iterator/std/async.find.js";
import { flatMap } from "./async-iterator/std/async.flatMap.js";
import { forEach } from "./async-iterator/std/async.forEach.js";
import { from } from "./async-iterator/std/async.from.js";
import { includes } from "./async-iterator/std/async.includes.js";
import { map } from "./async-iterator/std/async.map.js";
import { reduce } from "./async-iterator/std/async.reduce.js";
import { some } from "./async-iterator/std/async.some.js";
import { take } from "./async-iterator/std/async.take.js";
import { toArray } from "./async-iterator/std/async.toArray.js";
import { zip } from "./async-iterator/std/async.zip.js";
import { zipKeyed } from "./async-iterator/std/async.zipKeyed.js";

export const AsyncIterator = Object.freeze({
  concat,
  drop,
  every,
  filter,
  find,
  flatMap,
  forEach,
  from,
  includes,
  map,
  reduce,
  some,
  take,
  toArray,
  zip,
  zipKeyed
});
