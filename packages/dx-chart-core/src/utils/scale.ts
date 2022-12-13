import {
  scaleLinear as d3ScaleLinear, scaleBand as d3ScaleBand,
} from '../d3-scale';
import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../constants';
import {
  ScaleObject, FactoryFn, DomainInfo, NumberArray, DomainBounds, DomainItems,
} from '../types';

/** @internal */
export const scaleLinear: FactoryFn = d3ScaleLinear as any;

export const scaleBand: FactoryFn = () => (
  d3ScaleBand().paddingInner(0.3).paddingOuter(0.15) as any
);

/** @internal */
export const isHorizontal = (name: string, rotated: boolean) => (
  name === ARGUMENT_DOMAIN === !rotated
);

// tslint:disable-next-line: ban-types
const makeScaleHelper = <T extends Function>(linear: T, band: T) => {
  const func: any = (scale: ScaleObject, ...args: any[]) => {
    const choosen = 'bandwidth' in scale ? band : linear;
    return choosen(scale, ...args);
  };
  return func as T;
};

const getLinearScaleWidth = (_: ScaleObject) => 0;

const getBandScaleWidth = (scale: ScaleObject) => scale.bandwidth!();

/** @internal */
export const getWidth = makeScaleHelper(getLinearScaleWidth, getBandScaleWidth);

/** @internal */
export const getValueDomainName = (name?: string) => name || VALUE_DOMAIN;

const floatsEqual = (a: number, b: number) => Math.abs(a - b) < Number.EPSILON;

/** @internal */
export const rangesEqual = (r1: Readonly<NumberArray>, r2: Readonly<NumberArray>) =>
  floatsEqual(r1[0], r2[0]) && floatsEqual(r1[1], r2[1]);

const wrapLinearScale = (scale: ScaleObject) => scale;

const wrapBandScale = (scale: ScaleObject): ScaleObject => {
  const ret: any = (value: any) => scale(value) + scale.bandwidth!() / 2;
  Object.assign(ret, scale);
  return ret;
};

const wrapScale = makeScaleHelper(wrapLinearScale, wrapBandScale);

/** @internal */
export const makeScale = ({ factory, domain }: DomainInfo, range: NumberArray) => {
  const scale = (factory || scaleLinear)().domain(domain).range(range);
  return wrapScale(scale);
};

// It is implicitly supposed that Chart can accept any d3 scale. It is wrong.
// The followings notes show that. d3 scales are not seamlessly interchangeable themselves
// (i.e. band scale has no "invert", continuous scale has no "bandwidth").
// We have to use "adapters" to mitigate the differences.
// Hence Chart can actually accept any object that matches "adapter" interface.
// TODO: We should update reference accordingly. There might be breaking changes though.

const scaleLinearBounds = (scale: ScaleObject, bounds: DomainBounds): NumberArray => (
  bounds.map(scale) as NumberArray
);

// There is an issue - when range is "inverted" values are scaled incorrectly.
//   scaleBand().domain(['a', 'b', 'c']).range([0, 60])('b') === 20
//   scaleBand().domain(['a', 'b', 'c']).range([60, 0])('b') === 20 (should be 40)
const scaleBandBounds = (scale: ScaleObject, bounds: DomainBounds): NumberArray => {
  const cleanScale = scale.copy().paddingInner!(0).paddingOuter!(0);
  const fullRange = scale.range();
  const sign = Math.sign(fullRange[1] - fullRange[0]);
  return sign >= 0
    ? [cleanScale(bounds[0]), cleanScale(bounds[1]) + cleanScale.bandwidth!()]
    : [cleanScale(bounds[0]) + cleanScale.bandwidth!(), cleanScale(bounds[1])];
};

const moveLinearScaleBounds = (
  scale: ScaleObject, bounds: DomainBounds, delta: number,
): DomainBounds => {
  const fullRange = scale.range();
  const sign = Math.sign(fullRange[1] - fullRange[0]);
  const range = scaleLinearBounds(scale, bounds);
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
  const newBounds: DomainBounds = [scale.invert!(r0), scale.invert!(r1)];
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

// Band case is processed separately to preserve categories count in the bounds range.
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

// Defines how much linear scale can be zoomed it.
// I.e. if original scale domain has size of 1, then fully zoomed scale domain has size
// of 1 / LINEAR_SCALE_ZOOMING_THRESHOLD.
const LINEAR_SCALE_ZOOMING_THRESHOLD = 1000;

const growLinearScaleBounds = (
  scale: ScaleObject, bounds: DomainBounds, delta: number, anchor: number,
): DomainBounds => {
  const fullRange = scale.range();
  const minRangeThreshold = (fullRange[1] - fullRange[0]) / LINEAR_SCALE_ZOOMING_THRESHOLD;
  const sign = Math.sign(fullRange[1] - fullRange[0]);
  const range = scaleBounds(scale, bounds);
  // If zooming in and initial range is already too small then do nothing.
  if (delta > 0 && Math.abs(range[1] - range[0]) <= Math.abs(minRangeThreshold)) {
    return bounds;
  }
  // If zooming out and initial range is already too large then do nothing.
  if (delta < 0 && Math.abs(range[1] - range[0]) >= Math.abs(fullRange[1] - fullRange[0])) {
    return bounds;
  }
  const t = Math.abs((anchor - range[0]) / (range[1] - range[0]));
  let r0 = range[0] + sign * delta * 2 * t;
  let r1 = range[1] - sign * delta * 2 * (1 - t);
  // If new range is outside of the left border then clamp it.
  if (Math.sign(r0 - fullRange[0]) !== sign) {
    r0 = fullRange[0];
  }
  // If new range is outside of the right border then clamp it.
  if (Math.sign(fullRange[1] - r1) !== sign) {
    r1 = fullRange[1];
  }
  // If new range is too small then make it no less than minimal available.
  if (Math.sign(r1 - r0) !== sign || Math.abs(r1 - r0) < Math.abs(minRangeThreshold)) {
    if (Math.abs(r0 - range[0]) < Math.abs(minRangeThreshold / 2)) {
      // Dock it to the start.
      r0 = range[0];
      r1 = r0 + minRangeThreshold;
    } else if (Math.abs(r1 - range[1]) < Math.abs(minRangeThreshold / 2)) {
      // Dock it to the end.
      r1 = range[1];
      r0 = r1 - minRangeThreshold;
    } else {
      // Dock it to the anchor.
      r0 = anchor - minRangeThreshold / 2;
      r1 = anchor + minRangeThreshold / 2;
    }
  }
  const newBounds: DomainBounds = [scale.invert!(r0), scale.invert!(r1)];
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

const invertLinearScaleBounds = (scale: ScaleObject, range: NumberArray): DomainBounds => {
  const fullRange = scale.range();
  const match = Math.sign(fullRange[1] - fullRange[0]) === Math.sign(range[1] - range[0]);
  return [
    scale.invert!(range[match ? 0 : 1]),
    scale.invert!(range[match ? 1 : 0]),
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

// Though these functions are used only in *Viewport* plugin (and so should be placed right there),
// they reside here so that internal scale specifics (*getWidth*)
// are encapsulated in this utility file.
/** @internal */
export const scaleBounds = makeScaleHelper(scaleLinearBounds, scaleBandBounds);
/** @internal */
export const moveBounds = makeScaleHelper(moveLinearScaleBounds, moveBandScaleBounds);
// "scaleBounds" would be a better name but "scale" is already occupied.
/** @internal */
export const growBounds = makeScaleHelper(growLinearScaleBounds, growBandScaleBounds);
/** @internal */
export const invertBoundsRange = makeScaleHelper(invertLinearScaleBounds, invertBandScaleBounds);
