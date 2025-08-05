const expectedConfigProps = ["space", "mainEnvironment", "managementToken"];

function validateSpaceConfig(spaceId, spaceConfig, expectedProps) {
  if (!spaceConfig || !Object.keys(spaceConfig).length) {
    throw new Error(`Contentful management space error (${spaceId}) - missing configuration`);
  }
  for (const prop of expectedProps) {
    if (!spaceConfig[prop]) {
      throw new Error(`Contentful management space error (${spaceId}) - missing config (${prop})`);
    }
  }
}
export const configure = (gasket, baseConfig) => {
  const { env } = baseConfig;
  const { spaces } = baseConfig.contentful;
  for (const spaceId of Object.keys(spaces)) {
    try {
      validateSpaceConfig(spaceId, spaces[spaceId], expectedConfigProps);
    } catch (error) {
      if (env !== "local") throw error;
      gasket.logger.warn(error.message);
      delete spaces[spaceId];
    }
  }
  if (Object.keys(spaces).length === 0) {
    throw new Error("At least one Contentful space needs to be configured.");
  }
  return baseConfig;
};
export default configure;
