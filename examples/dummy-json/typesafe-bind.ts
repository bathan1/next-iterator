import { Iterator } from "@/lib/iterator.js";
import type { TodosResponse } from "./types.js";
import { getCompletedTodosTexts } from "./completed-todos-content.js";

const capitalize = Iterator.map.bind(
  null,
  (s: string) => s.toUpperCase()
);

const findLt100Chars = Iterator.filter.bind(
  null,
  (s: string) => s.length < 100
);

const textLines = await getCompletedTodosTexts();
console.log("original:", textLines.toArray());

const screamingTextLines = capitalize(textLines);
console.log("screaming:", screamingTextLines.toArray());

const shortTextLines = findLt100Chars(textLines);
console.log('short:', shortTextLines.toArray());

const screamingShortTextLines = findLt100Chars(
  capitalize(textLines)
);
console.log('screaming short:', screamingShortTextLines.toArray())
