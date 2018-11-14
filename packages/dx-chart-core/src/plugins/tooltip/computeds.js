export const getParameters = (series, target) => {
  if (target) {
    const currentSeries = series.find(({ name }) => target.series === name);
    const item = currentSeries.points[target.point];
    return { element: currentSeries.getTargetElement(item), text: `${target.series}: ${item.value}` };
  }
  return { element: {}, text: '' };
};
