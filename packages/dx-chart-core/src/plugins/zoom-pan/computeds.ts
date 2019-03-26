import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  getValueDomainName, makeScale, scaleBounds, rangesEqual,
  moveBounds, growBounds, invertBoundsRange,
} from '../../utils/scale';
// import { scaleQuantize } from 'd3-scale';
import {
  NumberArray,
  ViewportOptions,
  ScalesCache,
  Coordinates,
  // BoundsFn,
  // ChangeBoundsFn,
  DomainInfoCache,
  RangesCache,
  DomainInfo,
  DomainBounds,
  OnViewportChange,
  // BoundsRectFn,
  // RectBox,
  // CompareBoundsFn,
  ScaleObject,
} from '../../types';

// const COEF = 30;

// const getCorrectRange = (range: any[], name: string): any[] => {
//   return name !== ARGUMENT_DOMAIN ? range.reverse() : range;
// };

// const panChangeBounds: ChangeBoundsFn = (from, to, delta, sign) =>
// [from - delta * sign, to - delta * sign];

// const panCompareBounds: CompareBoundsFn = (prev, current, initial) =>
// ((current[0] < initial[0] && initial[0] - prev[0] === 0) ||
//   (current[1] > initial[1] && initial[1] - prev[1] === 0));

// const zoomChangeBounds: ChangeBoundsFn = (from, to, delta, sign) =>
// [from + delta * sign, to - delta * sign];

// const zoomCompareBounds: CompareBoundsFn = (
//   prev, current, initial, minDelta,
// ) =>
// ((current[0] < initial[0] && initial[0] - prev[0] === 0) &&
// (current[1] > initial[1] && initial[1] - prev[1] === 0)) ||
// (current[1] - current[0] < minDelta!);

const getArgumentBounds = (viewport?: ViewportOptions): DomainBounds | null => (
  viewport && viewport.argumentStart !== undefined && viewport.argumentEnd !== undefined
    ? [viewport.argumentStart, viewport.argumentEnd] : null
);

const getValueBounds = (viewport?: ViewportOptions): DomainBounds | null => (
  viewport && viewport.valueStart !== undefined && viewport.valueEnd !== undefined
    ? [viewport.valueStart, viewport.valueEnd] : null
);

const getValueScaleName = (viewport?: ViewportOptions) => (
  getValueDomainName(viewport && viewport.scaleName)
);

const getDefaultBounds = (scale: ScaleObject): DomainBounds => {
  const domain = scale.domain();
  return [domain[0], domain[domain.length - 1]];
};

// const scrollBounds = (
//   scale: ScaleObject, bounds: DomainBounds, delta: number,
// ): DomainBounds => {
//   const range = scaleBounds(scale, bounds);
//   const sign = Math.sign(range[1] - range[0]);
//   let newStart = invert(scale, range[0] - sign * delta);
//   let newEnd = invert(scale, range[1] - sign * delta);
//   const defaultBounds = getDefaultBounds(scale);
//   if (newStart === undefined) {
//     newStart = defaultBounds[0];
//     newEnd = invert(scale, scale.range()[0] + range[1] - range[0]);
//   }
//   if (newEnd === undefined) {
//     newEnd = defaultBounds[1];
//     newStart = invert(scale, scale.range()[1] - range[1] + range[0]);
//   }
//   return [newStart, newEnd];
// };

// const zoomBounds = (
//   scale: ScaleObject, bounds: DomainBounds, delta: number,
// ): DomainBounds => {
//   const range = scaleBounds(scale, bounds);
//   const sign = Math.sign(range[1] - range[0]);
//   const newStart = invert(scale, range[0] + sign * delta);
//   const newEnd = invert(scale, range[1] - sign * delta);
//   const defaultBounds = getDefaultBounds(scale);
//   return [
//     newStart !== undefined ? newStart : defaultBounds[0],
//     newEnd !== undefined ? newEnd : defaultBounds[1],
//   ];
// };

// const applyRange = (
//   scale: ScaleObject, bounds: DomainBounds, [start, end]: NumberArray,
// ): DomainBounds => {
//   const newStart = invert(scale, start);
//   const newEnd = invert(scale, end);
//   const defaultBounds = getDefaultBounds(scale);
//   return [
//     newStart !== undefined ? newStart : defaultBounds[0],
//     newEnd !== undefined ? newEnd : defaultBounds[1],
//   ];
// };

const boundsForScale = (
  name: string, scales: ScalesCache, currentBounds: DomainBounds | null,
  interaction: string, type: string, delta: number, anchor: number, range?: NumberArray,
): DomainBounds | null => {
  if (interaction !== type && interaction !== 'both') {
    return null;
  }
  const scale = scales[name];
  const bounds = currentBounds || getDefaultBounds(scale);
  let newBounds: DomainBounds;
  if (type === 'pan') {
    newBounds = moveBounds(scale, bounds, delta);
  } else if (type === 'zoom') {
    if (range) {
      newBounds = invertBoundsRange(scale, range);
    } else {
      newBounds = growBounds(scale, bounds, delta, anchor);
    }
  }
  return newBounds! !== bounds ? newBounds! : null;
};

// const adjustBounds = (current, initial) => {
//   return [
//     current[0] < initial[0] ? initial[0] : current[0],
//     current[1] > initial[1] ? initial[1] : current[1],
//   ];
// };

/** @internal */
export const getViewport = (
  scales: ScalesCache,
  interactions: Readonly<[string, string]>, type: string,
  deltas: Readonly<[number, number]> | null,
  anchors: Readonly<[number, number]> | null,
  ranges: Readonly<[NumberArray, NumberArray]> | null,
  viewport?: ViewportOptions, onViewportChange?: OnViewportChange,
) => {
  const changes: any = {};
  const argumentBounds = boundsForScale(
    ARGUMENT_DOMAIN, scales, getArgumentBounds(viewport),
    interactions[0], type,
    deltas ? deltas[0] : 0, anchors ? anchors[0] : 0,
    ranges ? ranges[0] : undefined,
  );
  const valueBounds = boundsForScale(
    getValueScaleName(viewport), scales, getValueBounds(viewport),
    interactions[1], type,
    deltas ? deltas[1] : 0, anchors ? anchors[1] : 0,
    ranges ? ranges[1] : undefined,
  );
  if (argumentBounds) {
    changes.argumentStart = argumentBounds[0];
    changes.argumentEnd = argumentBounds[1];
  }
  if (valueBounds) {
    changes.valueStart = valueBounds[0];
    changes.valueEnd = valueBounds[1];
  }
  if (Object.keys(changes).length) {
    const newViewport = { ...viewport, ...changes };
    if (onViewportChange) {
      onViewportChange(newViewport);
    }
    return { viewport: newViewport };
  }
  return null;
};

// const getDiscreteBounds = (
//   changeBounds: ChangeBoundsFn, compareBounds,
//   bounds: any[], initialRange: ReadonlyArray<any>, delta: number,
// ): DomainBounds | null => {
//   const count = Math.round(delta / COEF);
//   const firstIndex = initialRange.findIndex((element) => {
//     return bounds[0] === element;
//   });
//   const lastIndex = initialRange.findIndex((element) => {
//     return bounds[1] === element;
//   });
//   const indexes = [0, initialRange.length - 1];

//   if (lastIndex - firstIndex === 1 && count > 0) {
//     return [initialRange[lastIndex], initialRange[lastIndex]];
//   }

//   const newIndexes = changeBounds(firstIndex, lastIndex, count, 1);
//   if (compareBounds([firstIndex, lastIndex], newIndexes, indexes, 1)) {
//     return null;
//   }
//   const adjustedIndexes = adjustBounds(newIndexes, indexes);
//   return [initialRange[adjustedIndexes[0]], initialRange[adjustedIndexes[1]]];
// };

// const getRectDiscreteBounds = (scale, bounds, rect, name): DomainBounds | null => {
//   const range = getRectBounds(rect, name);
//   const scaleQuant = scaleQuantize().domain(scale.range()).range(scale.domain());
//   const val1 = scaleQuant(range[0]);
//   const val2 = scaleQuant(range[1]);
//   if (bounds[0] !== val1 || bounds[1] !== val2) {
//     return [val1, val2];
//   }
//   return null;
// };

// const getBounds: BoundsFn = (name, scale, bounds, delta, changeBounds) => {
//   const [from, to] = getCorrectRange([
//     scale(bounds![0]),
//     scale(bounds![1]),
//   ], name);
//   const sign = to - from > 0 ? +1 : -1;
//   return getCorrectRange(changeBounds(from, to, delta, sign), name);
// };

// const getRectBounds: BoundsRectFn = (rectBox, name) => {
//   if (name === ARGUMENT_DOMAIN) {
//     return [rectBox.x, rectBox.x + rectBox.width];
//   }
//   return [rectBox!.y + rectBox!.height, rectBox!.y];
// };

// Given original scale
//   f(domain) = range
//   f(subDomain) = subRange
// Find extended scale
//   g(domain) = extendedRange
//   g(subDomain) = range
// Original "range" is linearly extended so that
//   extendedRange : range === range : subRange
// y = p * x + q
//   subRange = p * range + q => p, q
//   range = p * extendedRange + q => extendedRange
const proportionallyExtendRange = (range: NumberArray, subRange: NumberArray): NumberArray => {
  const p = (subRange[0] - subRange[1]) / (range[0] - range[1]);
  const q = subRange[0] - p * range[0];
  return [
    (range[0] - q) / p,
    (range[1] - q) / p,
  ];
};

const adjustRange = (domain: DomainInfo, bounds: DomainBounds, range: NumberArray) => {
  const scale = makeScale(domain, range);
  const subRange = scaleBounds(scale, bounds);
  return rangesEqual(subRange, range) ? range : proportionallyExtendRange(range, subRange);
};

const update = (
  ranges: RangesCache, changes: any, key: string, domain: DomainInfo, bounds: DomainBounds,
) => {
  const newRange = adjustRange(domain, bounds, ranges[key]);
  if (newRange !== ranges[key]) {
    changes[key] = newRange;
  }
};

// const getFullBounds = (scale: ScaleObject): DomainBounds => {
//   const domain = scale.domain();
//   return [domain[0], domain[domain.length - 1]];
// };

/** @internal */
export const adjustLayout = (
  domains: DomainInfoCache, ranges: RangesCache, viewport?: ViewportOptions,
) => {
  const changes = {};
  const argumentBounds = getArgumentBounds(viewport);
  if (argumentBounds) {
    update(ranges, changes, ARGUMENT_DOMAIN, domains[ARGUMENT_DOMAIN], argumentBounds);
  }
  const valueBounds = getValueBounds(viewport);
  if (valueBounds) {
    update(ranges, changes, VALUE_DOMAIN, domains[getValueScaleName(viewport)], valueBounds);
  }
  return Object.keys(changes).length ? { ...ranges, ...changes } : ranges;
};

export const offsetCoordinates = (coordinates: Coordinates, offset: NumberArray) => {
  return {
    x: coordinates.x - offset[0],
    y: coordinates.y - offset[1],
  };
};

export const getDeltaForTouches = (touches: Touch[]) => {
  const deltaX = touches[0].pageX - touches[1].pageX;
  const deltaY = touches[0].pageY - touches[1].pageY;
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
};

export const checkDragToZoom = (zoomRegionKey: string, event: MouseEvent) => {
  return event[`${zoomRegionKey}Key`];
};

// const canScroll = (interact: any) => interact === 'pan' || interact === 'both';
// const canZoom = (interact: any) => interact === 'zoom' || interact === 'both';

// /** @internal */
// export const scrollViewport = (
//   scales: ScalesCache, viewport: ViewportOptions,
//   argumentOffset: number, valueOffset: number,
//   argumentFlag: any, valueFlag: any,
// ) => {
//   const changes: any = {};
//   if (canScroll(argumentFlag)) {
//     const scale = scales[ARGUMENT_DOMAIN];
//     const bounds = getArgumentBounds(viewport) || getFullBounds(scale);
//     const newBounds = scrollBounds(scale, bounds, argumentOffset);
//     if (newBounds) {
//       changes.argumentStart = newBounds[0];
//       changes.argumentEnd = newBounds[1];
//     }
//   }
//   if (canScroll(valueFlag)) {
//     const scale = scales[getValueDomainName(viewport.scaleName)];
//     const bounds = getValueBounds(viewport) || getFullBounds(scale);
//     const newBounds = scrollBounds(scale, bounds, valueOffset);
//     if (newBounds) {
//       changes.valueStart = newBounds[0];
//       changes.valueEnd = newBounds[1];
//     }
//   }
// };
