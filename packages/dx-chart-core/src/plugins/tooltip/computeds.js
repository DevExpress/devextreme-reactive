export const getParameters = (series, targets) => {
  if (targets) {
    const currentSeries = series.find(({ name }) => targets[0].series === name);
    const item = currentSeries.points[targets[0].point];
    return { element: currentSeries.getTargetElement(item), text: `${targets[0].series}: ${item.value}` };
  }
  return { element: {}, text: '' };
};
