import { zip } from "./zip.js";

import { drop } from "./drop.js";
import { every } from "./every.js";
import { filter } from "./filter.js";
import { includes } from "./includes.js";

export const NextIterator = Object.freeze({
  drop,
  every,
  filter,
  includes,
  zip
});
