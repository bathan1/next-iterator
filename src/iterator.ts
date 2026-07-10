import { concat } from "./iterator/concat.js";
import { drop } from "./iterator/drop.js";
import { every } from "./iterator/every.js";
import { filter } from "./iterator/filter.js";
import { find } from "./iterator/find.js";
import { flatMap } from "./iterator/flatMap.js";
import { forEach } from "./iterator/forEach.js";
import { from } from "./iterator/from.js";
import { includes } from "./iterator/includes.js";
import { map } from "./iterator/map.js";
import { reduce } from "./iterator/reduce.js";
import { some } from "./iterator/some.js";
import { take } from "./iterator/take.js";
import { toArray } from "./iterator/toArray.js";
import { zip } from "./iterator/zip.js";
import { zipKeyed } from "./iterator/zipKeyed.js";

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
