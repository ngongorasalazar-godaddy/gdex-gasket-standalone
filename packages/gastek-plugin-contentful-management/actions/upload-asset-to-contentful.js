import { contentfulAssetsUtils } from "../utils/index.js";

export const uploadAssetToContentful = async (gasket, props) => {
  await gasket.isReady;

  if (!("contentType" in props)) throw new Error("uploadAssetToContentful: missing param (contentType)");
  if (!("file" in props)) throw new Error("uploadAssetToContentful: missing param (file)");
  if (!("fileName" in props)) throw new Error("uploadAssetToContentful: missing param (fileName)");

  return await contentfulAssetsUtils.uploadAssetToContentful({
    CONTENTFUL_ENVIRONMENT: gasket.config.contentful.spaces.main.mainEnvironment,
    CONTENTFUL_MANAGEMENT_TOKEN: gasket.config.contentful.spaces.main.managementToken,
    CONTENTFUL_REGION: props.region,
    CONTENTFUL_SPACE_ID: gasket.config.contentful.spaces.main.space,
    contentType: props.contentType,
    file: props.file,
    fileName: props.fileName,
  });
};
