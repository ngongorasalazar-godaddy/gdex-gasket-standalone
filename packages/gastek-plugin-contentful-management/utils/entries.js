import { getContentfulManagementClient } from "./client.js";

/**
 * Posts (creates) a new entry in Contentful using the Management API
 *
 * @param {Object} options - Options for creating the entry
 * @param {String} options.contentTypeId - Content type ID for the new entry
 * @param {Object} options.fields - Fields for the new entry (localized)
 * @param {Boolean} options.publish - Whether to publish the entry immediately (default: true)
 * @returns {Promise<Object>} The created entry
 */
export const createContentfulEntry = async ({
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
  contentTypeId,
  fields,
  publish,
}) => {
  // Create the client
  const client = getContentfulManagementClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
  });

  // Get space and environment
  const space = await client.getSpace(CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

  // Create the entry
  const entry = await environment.createEntry(contentTypeId, {
    fields,
  });

  // Publish the entry if requested
  if (publish) {
    return await entry.publish();
  }

  return entry;
};
