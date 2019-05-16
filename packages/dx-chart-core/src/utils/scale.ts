import {
  scaleLinear as d3ScaleLinear, scaleBand as d3ScaleBand,
} from 'd3-scale';
import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../constants';
import {
  ScaleObject, FactoryFn, DomainInfo, NumberArray, DomainBounds, DomainItems,
} from '../types';

/** @internal */
export const scaleLinear: FactoryFn = d3ScaleLinear as any;
/** @internal */
export const scaleBand: FactoryFn = () => (
  d3ScaleBand().paddingInner(0.3).paddingOuter(0.15) as any
);

/** @internal */
export const isHorizontal = (name: string) => name === ARGUMENT_DOMAIN;

/** @internal */
export const getWidth = (scale: ScaleObject) => (
  scale.bandwidth ? scale.bandwidth() : 0
);

/** @internal */
export const fixOffset = (scale: ScaleObject): ((value: number) => number) => {
  const offset = getWidth(scale) / 2;
  return offset > 0 ? value => scale(value) + offset : scale;
};

/** @internal */
export const getValueDomainName = (name?: string) => name || VALUE_DOMAIN;

const floatsEqual = (a: number, b: number) => Math.abs(a - b) < Number.EPSILON;

/** @internal */
export const rangesEqual = (r1: Readonly<NumberArray>, r2: Readonly<NumberArray>) =>
  floatsEqual(r1[0], r2[0]) && floatsEqual(r1[1], r2[1]);

/** @internal */
export const makeScale = ({ factory, domain }: DomainInfo, range: NumberArray) => (
  (factory || scaleLinear)().domain(domain).range(range)
);

// Though this function is used only in *Viewport* plugin (and so should be placed right there),
// it resides here so that internal scale specifics (*getWidth*)
// are encapsulated in this utility file.
//
/** @internal */
export const scaleBounds = (scale: ScaleObject, bounds: DomainBounds): NumberArray => {
  // There is an issue - when range is "inverted" values are scaled incorrectly.
  //   scaleBand().domain(['a', 'b', 'c']).range([0, 60])('b') === 20
  //   scaleBand().domain(['a', 'b', 'c']).range([60, 0])('b') === 20 (should be 40)
  // Because of it bounds for reversed band scale are scaled wrong.
  // Fixing it would introduce an utility "scale" function and complicates the code.
  // Since for now we do not have "reversed" band scales the issue is left as-is.
  if (scale.bandwidth) {
    const cleanScale = scale.copy().paddingInner!(0).paddingOuter!(0);
    return [cleanScale(bounds[0]), cleanScale(bounds[1]) + cleanScale.bandwidth!()];
  }
  return bounds.map(scale) as NumberArray;
};

// Because of "scaleBands" issue moving and growing for "reversed" band scales
// are not supported now.

const moveLinearScaleBounds = (
  scale: ScaleObject, bounds: DomainBounds, delta: number,
): DomainBounds => {
  const fullRange = scale.range();
  const sign = Math.sign(fullRange[1] - fullRange[0]);
  const range = scaleBounds(scale, bounds);
  let r0 = range[0] + delta;
  let r1 = range[1] + delta;
  // Check if new range is outside of the left border.
  if (Math.sign(r0 - fullRange[0]) !== sign) {
    r0 = fullRange[0];
    r1 = r0 + range[1] - range[0];
  }
  // Check if new range is outside of the right border.
  if (Math.sign(fullRange[1] - r1) !== sign) {
    r1 = fullRange[1];
    r0 = r1 - range[1] + range[0];
  }
  const newBounds: DomainBounds = [scale.invert(r0), scale.invert(r1)];
  return rangesEqual(bounds, newBounds) ? bounds : newBounds;
};

// This is pointer "delta" processing specific for "band" scale.
// If pointer delta is significantly smaller than band size (0.3) then movement should be skipped
// and current delta should be added to a next one (from a new "move" event).
// Now there is no code that accumulates deltas.
// In order to allow band scrolling at least somehow the following is applied - if pointer delta
// is at least greater than 30 pixel then minimal movement is performed.
// TODO: Make proper delta accumulation!
const adjustBandScaleMoveStep = (delta: number, step: number) => {
  const ratio = Math.abs(delta / step);
  const sign = Math.sign(delta / step);
  if (ratio >= 0.5) {
    return sign * Math.round(ratio);
  }
  if (ratio >= 0.3) {
    return sign;
  }
  if (Math.abs(delta) > 30) {
    return sign;
  }
  return 0;
};

// Band case is processed separately to preserve categories amount in the bounds range.
// If common inversion mechanism is used start and end bounds cannot be inverted independently
// because of rounding issues which may add or remove categories to the new bounds.
const moveBandScaleBounds = (
  scale: ScaleObject, bounds: DomainBounds, delta: number,
): DomainBounds => {
  const domain = scale.domain();
  const fullRange = scale.range();
  const step = (fullRange[1] - fullRange[0]) / domain.length;
  const rangeStep = adjustBandScaleMoveStep(delta, step);
  if (rangeStep === 0) {
    return bounds;
  }
  const range = scaleBounds(scale, bounds);
  const range0 = Math.round((range[0] - fullRange[0]) / step);
  const range1 = range0 + Math.round((range[1] - range[0]) / step) - 1;
  let new0 = range0 + rangeStep;
  let new1 = range1 + rangeStep;
  if (new0 < 0) {
    new0 = 0;
    new1 = new0 + range1 - range0;
  }
  if (new1 > domain.length - 1) {
    new1 = domain.length - 1;
    new0 = new1 - range1 + range0;
  }
  if (new0 === range0 || new1 === range1) {
    return bounds;
  }
  return [domain[new0], domain[new1]];
};

/** @internal */
export const moveBounds = (
  scale: ScaleObject, bounds: DomainBounds, delta: number,
) => (
  (scale.bandwidth ? moveBandScaleBounds : moveLinearScaleBounds)(scale, bounds, delta)
);

const growLinearScaleBounds = (
  scale: ScaleObject, bounds: DomainBounds, delta: number, anchor: number,
): DomainBounds => {
  const fullRange = scale.range();
  const sign = Math.sign(fullRange[1] - fullRange[0]);
  const range = scaleBounds(scale, bounds);
  const t = Math.abs((anchor - range[0]) / (range[1] - range[0]));
  let r0 = range[0] + sign * delta * 2 * t;
  let r1 = range[1] - sign * delta * 2 * (1 - t);
  // Check if new range is outside of the left border.
  if (Math.sign(r0 - fullRange[0]) !== sign) {
    r0 = fullRange[0];
  }
  // Check if new range is outside of the right border.
  if (Math.sign(fullRange[1] - r1) !== sign) {
    r1 = fullRange[1];
  }
  const minRangeThreshold = (fullRange[1] - fullRange[0]) / 100;
  // Check if new range is too small.
  if (Math.sign(r1 - r0) !== sign || Math.abs(r1 - r0) < Math.abs(minRangeThreshold)) {
    r0 = anchor - minRangeThreshold / 2;
    r1 = anchor + minRangeThreshold / 2;
  }
  const newBounds: DomainBounds = [scale.invert(r0), scale.invert(r1)];
  return rangesEqual(bounds, newBounds) ? bounds : newBounds;
};

const growBandScaleBounds = (
  scale: ScaleObject, bounds: DomainBounds, delta: number, anchor: number,
): DomainBounds => {
  const domain = scale.domain();
  const fullRange = scale.range();
  const step = (fullRange[1] - fullRange[0]) / domain.length;
  const range = scaleBounds(scale, bounds);
  const range0 = Math.round((range[0] - fullRange[0]) / step);
  const range1 = range0 + Math.round((range[1] - range[0]) / step) - 1;
  // Let it be always 1 for now.
  const rangeStep = Math.sign(delta);
  if (
    (rangeStep === 0) ||
    (rangeStep > 0 && range0 === range1) ||
    (rangeStep < 0 && range0 === 0 && range1 === domain.length - 1)
  ) {
    return bounds;
  }
  const t = Math.abs((anchor - range[0]) / (range[1] - range[0]));
  let new0 = range0 + Math.round(rangeStep * 2 * t);
  let new1 = range1 - Math.round(rangeStep * 2 * (1 - t));
  if (new0 < 0) {
    new0 = 0;
  }
  if (new1 > domain.length - 1) {
    new1 = domain.length - 1;
  }
  if (new0 > new1) {
    if (t <= 0.5) {
      new1 = new0;
    } else {
      new0 = new1;
    }
  }
  if (new0 === range0 && new1 === range1) {
    return bounds;
  }
  return [domain[new0], domain[new1]];
};

// "scaleBounds" would be a better name but "scale" is already occupied.
/** @internal */
export const growBounds = (
  scale: ScaleObject, bounds: DomainBounds, delta: number, anchor: number,
) => (
  (scale.bandwidth ? growBandScaleBounds : growLinearScaleBounds)(scale, bounds, delta, anchor)
);

const invertLinearScaleBounds = (scale: ScaleObject, range: NumberArray): DomainBounds => {
  const fullRange = scale.range();
  const match = Math.sign(fullRange[1] - fullRange[0]) === Math.sign(range[1] - range[0]);
  return [
    scale.invert(range[match ? 0 : 1]),
    scale.invert(range[match ? 1 : 0]),
  ];
};

const matchPointToBand = (domain: DomainItems, range: NumberArray, p: number) => {
  const i = Math.floor(domain.length * (p - range[0]) / (range[1] - range[0]));
  return domain[Math.min(i, domain.length - 1)];
};

const invertBandScaleBounds = (scale: ScaleObject, range: NumberArray): DomainBounds => {
  const domain = scale.domain();
  const fullRange = scale.range();
  return [
    matchPointToBand(domain, fullRange, range[0]),
    matchPointToBand(domain, fullRange, range[1]),
  ];
};

/** @internal */
export const invertBoundsRange = (scale: ScaleObject, range: NumberArray) => (
  (scale.bandwidth ? invertBandScaleBounds : invertLinearScaleBounds)(scale, range)
);
