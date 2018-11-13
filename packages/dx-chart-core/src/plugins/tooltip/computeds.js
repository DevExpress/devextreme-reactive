export const getParameters = (series, target) => {
  if (target && target.point !== undefined) {
    const currentSeries = series.find(({ name }) => target.series === name);
    const item = currentSeries.points[target.point];
    return { element: currentSeries.getTargetElement(item), text: `${target.series}: ${item.value}` };
  }
  return { element: {}, text: '' };
};
