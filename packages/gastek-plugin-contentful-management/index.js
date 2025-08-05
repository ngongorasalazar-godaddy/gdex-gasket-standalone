import configure from "./configure.js";

import { createContentfulEntry } from "./actions/create-contentful-entry.js";
import { uploadAssetToContentful } from "./actions/upload-asset-to-contentful.js";

const plugin = {
  name: "@gdex-standalone/gasket-plugin-contentful-management",
  hooks: {
    configure,
  },
  actions: {
    createContentfulEntry,
    uploadAssetToContentful,
  },
};

export * from "./types.js";
export default plugin;
