import ContentfulManagement from "contentful-management";

/**
 * Creates a client for the Contentful Management API
 *
 * @param {Object} config - Configuration object
 * @param {String} config.accessToken - Contentful Management API token
 * @returns {Object} Contentful Management client
 */
export const getContentfulManagementClient = (config) => {
  return ContentfulManagement.createClient({
    accessToken: config.accessToken,
  });
};
