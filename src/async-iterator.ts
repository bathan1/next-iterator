import { concat } from "./async-iterator/std/concat.js";
import { drop } from "./async-iterator/std/drop.js";
import { every } from "./async-iterator/std/every.js";
import { filter } from "./async-iterator/std/filter.js";
import { find } from "./async-iterator/std/find.js";
import { flatMap } from "./async-iterator/std/flatMap.js";
import { forEach } from "./async-iterator/std/forEach.js";
import { from } from "./async-iterator/std/from.js";
import { includes } from "./async-iterator/std/includes.js";
import { map } from "./async-iterator/std/map.js";
import { reduce } from "./async-iterator/std/reduce.js";
import { some } from "./async-iterator/std/some.js";
import { take } from "./async-iterator/std/take.js";
import { toArray } from "./async-iterator/std/toArray.js";
import { zip } from "./async-iterator/std/zip.js";
import { zipKeyed } from "./async-iterator/std/zipKeyed.js";

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
