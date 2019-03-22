import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  getValueDomainName, makeScale, scaleBounds, rangesEqual,
} from '../../utils/scale';
import { scaleQuantize } from 'd3-scale';
import {
  NumberArray,
  ViewportOptions,
  ScalesCache,
  Coordinates,
  BoundsFn,
  ChangeBoundsFn,
  DomainInfoCache,
  RangesCache,
  DomainInfo,
  DomainBounds,
  OnViewportChange,
  BoundsRectFn,
  RectBox,
  BoundsForScaleFn,
  CompareBoundsFn,
} from '../../types';

const COEF = 30;

const getCorrectRange = (range: any[], name: string): any[] => {
  return name !== ARGUMENT_DOMAIN ? range.reverse() : range;
};

const panChangeBounds: ChangeBoundsFn = (from, to, delta, sign) =>
[from - delta * sign, to - delta * sign];

const panCompareBounds: CompareBoundsFn = (prev, current, initial) =>
((current[0] < initial[0] && initial[0] - prev[0] === 0) ||
  (current[1] > initial[1] && initial[1] - prev[1] === 0));

const zoomChangeBounds: ChangeBoundsFn = (from, to, delta, sign) =>
[from + delta * sign, to - delta * sign];

const zoomCompareBounds: CompareBoundsFn = (
  prev, current, initial, minDelta,
) =>
((current[0] < initial[0] && initial[0] - prev[0] === 0) &&
(current[1] > initial[1] && initial[1] - prev[1] === 0)) ||
(current[1] - current[0] < minDelta!);

const getPrevBounds = (
  name: string,
  initialBounds: ReadonlyArray<any>,
  viewport?: ViewportOptions,
): any => {
  return viewport ? (name === ARGUMENT_DOMAIN ?
    [viewport.argumentStart, viewport.argumentEnd] :
    [viewport.valueStart, viewport.valueEnd]) :
    [initialBounds[0], initialBounds[initialBounds.length - 1]];
};

const getValueScaleName = (viewport?: ViewportOptions) =>
viewport && viewport.scaleName || VALUE_DOMAIN;

const boundsForScale = (name: string, scales: ScalesCache, interaction: string,
  type: string, rect: RectBox | null, delta: number,
  viewport?: ViewportOptions): BoundsForScaleFn => {

  const changeBounds = type === 'zoom' ? zoomChangeBounds : panChangeBounds;
  const compareBounds = type === 'zoom' ? zoomCompareBounds : panCompareBounds;
  const scale = scales[name];
  const initialBounds = scale.domain();
  const bounds = getPrevBounds(name, initialBounds, viewport);
  if (interaction !== type && interaction !== 'both') {
    return { prev: bounds };
  }

  if (scale.bandwidth) {
    return rect ?
    getRectDiscreteBounds(scale, bounds, rect, name) :
    getDiscreteBounds(changeBounds, compareBounds, bounds, initialBounds, delta);
  }
  const range = rect ?
    getRectBounds(rect, name) :
    getBounds(name, scale, bounds, delta, changeBounds);
  const minDelta = (initialBounds[1] - initialBounds[0]) * 0.01;
  const value1 = scale.invert(range[0]);
  const value2 = scale.invert(range[1]);

  if (compareBounds(bounds, [value1, value2], initialBounds, minDelta)) {
    return { prev: bounds };
  }
  return {
    current: adjustBounds([value1, value2], initialBounds),
  };
};
const adjustBounds = (current, initial) => {
  return [
    current[0] < initial[0] ? initial[0] : current[0],
    current[1] > initial[1] ? initial[1] : current[1],
  ];
};

/** @internal */
export const getViewport = (
  scales: ScalesCache, interactions: string[],
  type: string, rect: RectBox | null, deltas: number[],
  viewport?: ViewportOptions, onViewportChange?: OnViewportChange,
) => {
  const argumentBounds = boundsForScale(
    ARGUMENT_DOMAIN, scales, interactions[0], type, rect, deltas[0], viewport,
  );
  const valueBounds = boundsForScale(
    getValueScaleName(viewport), scales, interactions[1], type,
    rect, deltas[1], viewport,
  );
  if (argumentBounds.current || valueBounds.current) {
    const bounds = {
      argumentStart: argumentBounds.current ? argumentBounds.current[0] : argumentBounds.prev![0],
      argumentEnd: argumentBounds.current ? argumentBounds.current[1] : argumentBounds.prev![1],
      valueStart: valueBounds.current ? valueBounds.current[0] : valueBounds.prev![0],
      valueEnd: valueBounds.current ? valueBounds.current[1] : valueBounds.prev![1],
      scaleName: viewport ? viewport.scaleName : undefined,
    };
    if (onViewportChange) {
      onViewportChange(bounds);
    }
    return { viewport: bounds };
  }
  return null;
};

const getDiscreteBounds = (
  changeBounds: ChangeBoundsFn, compareBounds,
  bounds: any[], initialRange: ReadonlyArray<any>, delta: number,
) => {
  const count = Math.round(delta / COEF);
  const firstIndex = initialRange.findIndex((element) => {
    return bounds[0] === element;
  });
  const lastIndex = initialRange.findIndex((element) => {
    return bounds[1] === element;
  });
  const indexes = [0, initialRange.length - 1];

  if (lastIndex - firstIndex === 1 && count > 0) {
    return { current: [initialRange[lastIndex], initialRange[lastIndex]] };
  }

  const newIndexes = changeBounds(firstIndex, lastIndex, count, 1);
  if (compareBounds([firstIndex, lastIndex], newIndexes, indexes, 1)) {
    return { prev: bounds };
  }
  const adjustedIndexes = adjustBounds(newIndexes, indexes);
  return {
    current: [initialRange[adjustedIndexes[0]], initialRange[adjustedIndexes[1]]],
  };
};

const getRectDiscreteBounds = (scale, bounds, rect, name) => {
  const range = getRectBounds(rect, name);
  const scaleQuant = scaleQuantize().domain(scale.range()).range(scale.domain());
  const val1 = scaleQuant(range[0]);
  const val2 = scaleQuant(range[1]);
  if (bounds[0] !== val1 || bounds[1] !== val2) {
    return { current: [val1, val2] };
  }
  return { prev: bounds };
};

const getBounds: BoundsFn = (name, scale, bounds, delta, changeBounds) => {
  const [from, to] = getCorrectRange([
    scale(bounds![0]),
    scale(bounds![1]),
  ], name);
  const sign = to - from > 0 ? +1 : -1;
  return getCorrectRange(changeBounds(from, to, delta, sign), name);
};

const getRectBounds: BoundsRectFn = (rectBox, name) => {
  if (name === ARGUMENT_DOMAIN) {
    return [rectBox.x, rectBox.x + rectBox.width];
  }
  return [rectBox!.y + rectBox!.height, rectBox!.y];
};

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

/** @internal */
export const adjustLayout = (
  domains: DomainInfoCache,
  ranges: RangesCache,
  { argumentStart, argumentEnd, scaleName, valueStart, valueEnd }: ViewportOptions,
) => {
  const changes = {};
  if (argumentStart && argumentEnd) {
    update(ranges, changes, ARGUMENT_DOMAIN,
      domains[ARGUMENT_DOMAIN], [argumentStart, argumentEnd]);
  }
  if (valueStart && valueEnd) {
    update(ranges, changes, VALUE_DOMAIN,
      domains[getValueDomainName(scaleName)], [valueStart, valueEnd]);
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
