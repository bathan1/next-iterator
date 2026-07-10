import { readFileSync } from "node:fs";
import { defineConfig } from "vitepress";

const registry = JSON.parse(readFileSync(new URL("../../registry.json", import.meta.url), "utf8"));

type RegistryItem = {
  name: string;
  type: string;
  files?: {
    path: string;
  }[];
};

const registryItems = registry.items as RegistryItem[];
const iteratorFunctionBase = "/api/variables/Iterator";
const asyncIteratorFunctionBase = "/api/variables/AsyncIterator";
const extFunctionBase = "/api/next-iterator/namespaces/ExtIterator/functions";

const registryItem = (name: string) => registryItems.find((item) => item.name === name);
const fileStem = (path: string) => path.slice(path.lastIndexOf("/") + 1, -".ts".length);
const objectFunctionItems = (
  name: string,
  sourceDirectory: string,
  functionBase: string,
  filePrefix = ""
) =>
  registryItem(name)
    ?.files?.filter((file) => file.path.startsWith(sourceDirectory))
    .map((file) => fileStem(file.path).slice(filePrefix.length))
    .map((name) => ({
      text: name,
      link: `${functionBase}#${name.toLowerCase()}`,
    })) ?? [];

const extFunctionEntries = registryItems
  .filter((item) => item.type === "registry:lib" && item.name.startsWith("ext/"))
  .map((item) => {
    const itemName = item.name.slice("ext/".length, -".js".length);
    const isAsync = itemName.startsWith("async.");
    const name = isAsync ? itemName.slice("async.".length) : itemName;

    return { isAsync, name };
  });

const syncExtFunctionNames = new Set(
  extFunctionEntries.filter((entry) => !entry.isAsync).map((entry) => entry.name)
);

const extFunctionItems = extFunctionEntries.map((entry) => ({
  text: entry.isAsync && syncExtFunctionNames.has(entry.name) ? `${entry.name} (async)` : entry.name,
  link: `${extFunctionBase}/${entry.name}`,
}));

export default defineConfig({
  title: "Next Iterator",
  description: "Top-level helpers for JavaScript iterables.",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Introduction", link: "/" },
      { text: "API", link: "/api/" },
    ],
    sidebar: [
      { text: "Introduction", link: "/" },
      {
        text: "Iterator",
        link: iteratorFunctionBase,
        collapsed: false,
        items: objectFunctionItems("iterator.js", "./src/iterator/", iteratorFunctionBase),
      },
      {
        text: "AsyncIterator",
        link: asyncIteratorFunctionBase,
        collapsed: false,
        items: objectFunctionItems(
          "async-iterator.js",
          "./src/async-iterator/async.",
          asyncIteratorFunctionBase,
          "async."
        ),
      },
      {
        text: "Ext",
        collapsed: false,
        items: extFunctionItems,
      },
    ],
    outline: {
      level: [2, 3],
      label: "On this page",
    },
    socialLinks: [{ icon: "github", link: registry.homepage }],
    search: {
      provider: "local",
    },
  },
});
