import { concat } from "./iterator/std/concat.js";
import { drop } from "./iterator/std/drop.js";
import { every } from "./iterator/std/every.js";
import { filter } from "./iterator/std/filter.js";
import { find } from "./iterator/std/find.js";
import { flatMap } from "./iterator/std/flatMap.js";
import { forEach } from "./iterator/std/forEach.js";
import { from } from "./iterator/std/from.js";
import { includes } from "./iterator/std/includes.js";
import { map } from "./iterator/std/map.js";
import { reduce } from "./iterator/std/reduce.js";
import { some } from "./iterator/std/some.js";
import { take } from "./iterator/std/take.js";
import { toArray } from "./iterator/std/toArray.js";
import { zip } from "./iterator/std/zip.js";
import { zipKeyed } from "./iterator/std/zipKeyed.js";

export const Iterator = Object.freeze({
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
