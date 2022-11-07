export const getNumberOfColumn = (containerId: string) => {
  return parseInt(containerId.split('-').reverse()[0]);
};
