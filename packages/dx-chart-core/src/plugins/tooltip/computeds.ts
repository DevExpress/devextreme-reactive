import { processPointerMove } from '../../utils/hover-state';
import {
  GetParametersFn, ProcessHandleTooltipFn,
} from '../../types';

export const getParameters: GetParametersFn = (series, target) => {
  const currentSeries = series.find(({ name }) => target.series === name);
  const item = currentSeries.points.find(point => point.index === target.point);
  return {
    element: currentSeries.getPointTransformer.getTargetElement(item),
    text: `${item.value}`,
  };
};

export const processHandleTooltip: ProcessHandleTooltipFn = (
  targets, currentTarget, onTargetItemChange,
) => {
  const filterTargets = targets.filter(target => target.point !== undefined);
  return processPointerMove(filterTargets, currentTarget, onTargetItemChange);
};
