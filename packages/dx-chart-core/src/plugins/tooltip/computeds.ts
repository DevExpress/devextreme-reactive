import { processPointerMove } from '../../utils/hover-state';
import { getOffset } from '../../utils/common';
import {
  SeriesList, SeriesRef, TransformedPoint, TargetList, NotifyPointerMoveFn,
  TooltipParameters, TooltipReference, Rect,
} from '../../types';

/** @internal */
export const getParameters = (series: SeriesList, target: SeriesRef): TooltipParameters => {
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
    const offset = getOffset(rootRef.current!);
    // *getBoundingClientRect* of a real html element is affected by window scrolling.
    // *popper.js* subscribes "html -> getBoundingClientRect -> (left, top)" from
    // "reference -> getBoundingClientRect" - so here it is added.
    const htmlRect = rootRef.current!.ownerDocument!.documentElement.getBoundingClientRect();
    const left = rect[0] + offset[0] + htmlRect.left;
    const right = rect[2] + offset[0] + htmlRect.left;
    const top = rect[1] + offset[1] + htmlRect.top;
    const bottom = rect[3] + offset[1] + htmlRect.top;
    return {
      left,
      top,
      right,
      bottom,
      width: right - left,
      height: bottom - top,
    };
  },
});

/** @internal */
export const processHandleTooltip = (
  targets: TargetList, currentTarget: SeriesRef, onTargetItemChange?: NotifyPointerMoveFn,
) => {
  const filterTargets = targets.filter(target => target.point !== undefined);
  return processPointerMove(filterTargets, currentTarget, onTargetItemChange);
};
