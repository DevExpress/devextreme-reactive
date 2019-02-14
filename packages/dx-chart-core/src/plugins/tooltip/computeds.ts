import { processPointerMove } from '../../utils/hover-state';
import { getRootOffset } from '../../utils/root-offset';
import {
  SeriesList, Target, TransformedPoint, TargetList, NotifyPointerMoveFn,
  TooltipParameters, TooltipReference, Rect,
} from '../../types';

/** @internal */
export const getParameters = (series: SeriesList, target: Target): TooltipParameters => {
  const currentSeries = series.find(({ name }) => target.series === name)!;
  const item = currentSeries.points.find(point => point.index === target.point) as TransformedPoint;
  return {
    element: currentSeries.getPointTransformer.getTargetElement(item),
    text: `${item.value}`,
  };
};

/** @internal */
export const createReference = (
  rect: Rect, rootRef: React.RefObject<Element>,
): TooltipReference => ({
  // These two fields together with *width* and *height* are left with stub data for
  // simplicity reasons - they seem to be unused by *Popper*.
  clientWidth: 0,
  clientHeight: 0,
  getBoundingClientRect() {
    // This function is expected to be called (by the *Popper*) when DOM is ready -
    // so *rootRef.current* can be accessed.
    const offset = getRootOffset(rootRef.current!);
    return {
      left: rect[0] + offset[0],
      top: rect[1] + offset[1],
      right: rect[2] + offset[0],
      bottom: rect[3] + offset[1],
      width: 0,
      height: 0,
    };
  },
});

/** @internal */
export const processHandleTooltip = (
  targets: TargetList, currentTarget: Target, onTargetItemChange?: NotifyPointerMoveFn,
) => {
  const filterTargets = targets.filter(target => target.point !== undefined);
  return processPointerMove(filterTargets, currentTarget, onTargetItemChange);
};
