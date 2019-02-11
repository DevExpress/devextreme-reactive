import { processPointerMove } from '../../utils/hover-state';
import {
  SeriesList, Target, TransformedPoint, TargetList, NotifyPointerMoveFn, TooltipParameters,
} from '../../types';

export const getParameters = (series: SeriesList, target: Target): TooltipParameters => {
  const currentSeries = series.find(({ name }) => target.series === name)!;
  const item = currentSeries.points.find(point => point.index === target.point) as TransformedPoint;
  return {
    element: currentSeries.getPointTransformer.getTargetElement(item),
    text: `${item.value}`,
  };
};

export const processHandleTooltip = (
  targets: TargetList, currentTarget: Target, onTargetItemChange: NotifyPointerMoveFn,
) => {
  const filterTargets = targets.filter(target => target.point !== undefined);
  return processPointerMove(filterTargets, currentTarget, onTargetItemChange);
};
