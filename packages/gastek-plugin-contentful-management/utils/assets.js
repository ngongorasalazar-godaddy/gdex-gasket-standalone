import { getContentfulManagementClient } from "./client.js";

/**
 * Resolves when the just-upload asset processing is completed.
 *
 * @param {Object} asset - The asset file to listen to
 * @param {String} locale - Locale code f.e.: "en-US"
 * @param {Object} environment - The contentful environment
 * @param {Number} maxTries - Max tries to check the status, each executed after [interval] ms
 * @param {Number} interval - Interval, in ms, between checks
 * @returns {Promise<void>} The promise to be resolved when asset processing is ready
 */
async function waitForAssetProcessing(asset, locale = CONTENTFUL_REGION, environment, maxTries = 10, interval = 2000) {
  let tries = 0;

  while (tries < maxTries) {
    const updatedAsset = await environment.getAsset(asset.sys.id);
    const file = updatedAsset.fields.file?.[locale];

    if (file?.url) {
      return updatedAsset; // processing complete
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
    tries++;
  }

  throw new Error(`Asset processing timed out for asset ID: ${asset.sys.id}`);
}

/**
 * Uploads assets to Contentful using the Management API
 *
 * @param {Object} file - The asset file to be upload as a buffer
 * @param {String} fileName - Name of the file, including the extension
 * @param {String} contentType - The content type of the file
 * @returns {Promise<Object>} The created entry
 */
export const uploadAssetToContentful = async ({
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_REGION = "en-US",
  contentType,
  file,
  fileName,
}) => {
  const client = getContentfulManagementClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);
  const upload = await environment.createUpload({ file });

  const asset = await environment.createAsset({
    fields: {
      title: { [CONTENTFUL_REGION]: fileName },
      file: {
        [CONTENTFUL_REGION]: {
          fileName,
          contentType,
          uploadFrom: {
            sys: {
              type: "Link",
              linkType: "Upload",
              id: upload.sys.id,
            },
          },
        },
      },
    },
  });

  await asset.processForLocale(CONTENTFUL_REGION);

  const processedAsset = await waitForAssetProcessing(asset, CONTENTFUL_REGION, environment);
  const publishedAsset = await processedAsset.publish();

  return publishedAsset;
};
