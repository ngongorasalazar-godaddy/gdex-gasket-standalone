export const createContentfulEntry = async (gasket, props) => {
  await gasket.isReady;
  console.log("NSALAZAR here at createContentfulEntry", props);
};
