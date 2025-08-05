import { contentfulEntriesUtils } from "../utils/index.js";

export const createContentfulEntry = async (gasket, props) => {
  await gasket.isReady;

  if (!("contentTypeId" in props)) throw new Error("createContentfulEntry: missing param (contentTypeId)");
  if (!("fields" in props)) throw new Error("createContentfulEntry: missing param (fields)");

  return await contentfulEntriesUtils.createContentfulEntry({
    CONTENTFUL_ENVIRONMENT: gasket.config.contentful.spaces.main.mainEnvironment,
    CONTENTFUL_MANAGEMENT_TOKEN: gasket.config.contentful.spaces.main.managementToken,
    CONTENTFUL_SPACE_ID: gasket.config.contentful.spaces.main.space,
    contentTypeId: props.contentTypeId,
    fields: props.fields,
    publish: props.publish,
  });
};
