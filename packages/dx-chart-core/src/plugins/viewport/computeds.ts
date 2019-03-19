import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  getValueDomainName, makeScale, scaleBounds,
} from '../../utils/scale';
import {
  DomainInfoCache,
  RangesCache,
  DomainInfo,
  DomainBounds,
  NumberArray,
  ViewportOptions,
} from '../../types';

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
