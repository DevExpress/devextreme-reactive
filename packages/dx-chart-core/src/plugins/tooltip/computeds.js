import { processPointerMove } from '../../utils/hover-state';

export const getParameters = (series, target) => {
  const currentSeries = series.find(({ name }) => target.series === name);
  const item = currentSeries.points.find(point => point.index === target.point);
  return { element: currentSeries.getTargetElement(item), text: `${item.value}` };
};

export const processHandleTooltip = (targets, currentTarget, onTargetItemChange) => {
  if (targets.length && targets[0].point !== undefined) {
    const target = processPointerMove(targets, currentTarget, onTargetItemChange);
    if (target !== undefined) {
      return { target };
    }
    return null;
  }
  return { target: null };
};
