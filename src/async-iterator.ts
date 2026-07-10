import { concat } from "./async-iterator/async.concat.js";
import { drop } from "./async-iterator/async.drop.js";
import { every } from "./async-iterator/async.every.js";
import { filter } from "./async-iterator/async.filter.js";
import { find } from "./async-iterator/async.find.js";
import { flatMap } from "./async-iterator/async.flatMap.js";
import { forEach } from "./async-iterator/async.forEach.js";
import { from } from "./async-iterator/async.from.js";
import { includes } from "./async-iterator/async.includes.js";
import { map } from "./async-iterator/async.map.js";
import { reduce } from "./async-iterator/async.reduce.js";
import { some } from "./async-iterator/async.some.js";
import { take } from "./async-iterator/async.take.js";
import { toArray } from "./async-iterator/async.toArray.js";
import { zip } from "./async-iterator/async.zip.js";
import { zipKeyed } from "./async-iterator/async.zipKeyed.js";

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
