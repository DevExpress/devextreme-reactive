export const getParameters = (series, target) => {
  const currentSeries = series.find(({ name }) => target.series === name);
  const item = currentSeries.points.find(point => point.index === target.point);
  return { element: currentSeries.getTargetElement(item), text: `${item.value}` };
};
