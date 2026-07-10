import { zip } from "../iterator/zip.js";

import { drop } from "../iterator/drop.js";
import { every } from "../iterator/every.js";
import { filter } from "../iterator/filter.js";
import { includes } from "../iterator/includes.js";

export const NextIterator = Object.freeze({
  drop,
  every,
  filter,
  includes,
  zip
});
