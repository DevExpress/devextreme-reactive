import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  getValueDomainName, makeScale, scaleBounds,
} from '../../utils/scale';
import {
  NumberArray,
  ViewportOptions,
  ScaleObject,
  ScalesCache,
  Coordinates,
  BoundsFn,
  DomainInfoCache,
  RangesCache,
  DomainInfo,
  DomainBounds,
} from '../../types';

const COEF = 30;

const getCorrectRange = (range: NumberArray, name: string): any[] => {
  return name !== ARGUMENT_DOMAIN ? range.reverse() : range;
};

const zoom = (from: number, to: number, delta: number, sign: number): NumberArray => {
  return [from + delta * sign, to - delta * sign];
};

const pan = (from: number, to: number, delta: number, sign: number): NumberArray => {
  return [from - delta * sign, to - delta * sign];
};

const getPrevBounds = (
  name: string,
  scale: ScaleObject,
  viewport?: ViewportOptions,
): any => {
  return viewport ? (name === ARGUMENT_DOMAIN ?
    [viewport.argumentStart, viewport.argumentEnd] :
    [viewport.valueStart, viewport.valueEnd]) : scale.domain();
};

export const getValueScaleName = (viewport?: ViewportOptions) =>
viewport && viewport.scaleName || VALUE_DOMAIN;

/** @internal */
export const adjustBounds = (name: string, scales: ScalesCache, interaction: string,
  type: string, getCurrentBounds: BoundsFn, delta: number, viewport?: ViewportOptions) => {
  const scale = scales[name];
  const bounds = getPrevBounds(name, scale, viewport);
  if (interaction !== type && interaction !== 'both') {
    return bounds;
  }
  const initialBounds = scale.domain();
  if (scale.bandwidth) {
    return getCategories(type, bounds, initialBounds, delta);
  }
  const range = getCurrentBounds(scale, bounds, delta, name, type);
  const minDelta = (initialBounds[1] - initialBounds[0]) * 0.01;
  const value1 = scale.invert(range[0]);
  const value2 = scale.invert(range[1]);

  if ((value2 - value1 < minDelta) ||
  (type === 'pan' && (value1 < initialBounds[0] || value2 > initialBounds[1]))) {
    return bounds;
  }
  return [
    value1 < initialBounds[0] ? initialBounds[0] : value1,
    value2 > initialBounds[1] ? initialBounds[1] : value2,
  ];
};

const getCategories = (type: string, currentRange: any, initialRange: any, delta: number) => {
  const count = Math.round(delta / COEF);
  const rangeLength = initialRange.length - 1;
  const currentBounds = [currentRange[0], currentRange[currentRange.length - 1]];
  const func = type === 'zoom' ? zoom : pan;
  const firstIndex = initialRange.findIndex((element) => {
    return currentBounds[0] === element;
  });
  const lastIndex = initialRange.findIndex((element) => {
    return currentBounds[1] === element;
  });
  const indexes = [0, rangeLength];
  const newIndexes = func(firstIndex, lastIndex, count, 1);
  if (type === 'zoom' && firstIndex === lastIndex && count > 0) {
    return currentBounds;
  }
  if (type === 'pan' && (newIndexes[0] < indexes[0] || newIndexes[1] > indexes[1])) {
    return currentBounds;
  }
  return [
    newIndexes[0] < indexes[0] ? initialRange[0] : initialRange[newIndexes[0]],
    newIndexes[1] > indexes[1] ? initialRange[rangeLength] : initialRange[newIndexes[1]],
  ];
};

// TODO: Copypaste!
const floatsEqual = (a: number, b: number) => Math.abs(a - b) < Number.EPSILON;

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
  if (floatsEqual(subRange[0], range[0]) && floatsEqual(subRange[1], range[1])) {
    return range;
  }
  return proportionallyExtendRange(range, subRange);
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

export const getBounds: BoundsFn = (scale, bounds, delta, name, type) => {
  const func = type === 'zoom' ? zoom : pan;
  const [from, to] = getCorrectRange([
    scale(bounds![0]),
    scale(bounds![1]),
  ], name);
  const sign = to - from > 0 ? +1 : -1;
  return getCorrectRange(func(from, to, delta, sign), name);
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

export const checkDragToZoom = (dragToZoom: boolean, panKey: string, event: MouseEvent) => {
  return dragToZoom && event[`${panKey}Key`];
};
