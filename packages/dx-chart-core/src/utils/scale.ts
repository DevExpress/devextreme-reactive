import {
  scaleLinear as d3ScaleLinear, scaleBand as d3ScaleBand,
} from 'd3-scale';
import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../constants';
import {
  ScaleObject, FactoryFn, DomainInfo, NumberArray, DomainBounds,
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
export const getValueDomainName = (name?: string) => name || VALUE_DOMAIN;

const floatsEqual = (a: number, b: number) => Math.abs(a - b) < Number.EPSILON;

/** @internal */
export const rangesEqual = (r1: NumberArray, r2: NumberArray) =>
  floatsEqual(r1[0], r2[0]) && floatsEqual(r1[1], r2[1]);

/** @internal */
export const makeScale = ({ factory, domain }: DomainInfo, range: NumberArray) => (
  (factory || scaleLinear)().domain(domain).range(range)
);

// Though this function is used only in *Viewport* plugin (and so should be placed right there),
// it resides here so that internal scale specifics (*getWidth*)
// are encapsulated in this utility file.
/** @internal */
export const scaleBounds = (scale: ScaleObject, bounds: DomainBounds): NumberArray => {
  if (scale.bandwidth) {
    const cleanScale = scale.copy().paddingInner!(0).paddingOuter!(0);
    return [cleanScale(bounds[0]), cleanScale(bounds[1]) + cleanScale.bandwidth!()];
  }
  return bounds.map(scale) as NumberArray;
};

const getRangePointRatio = (scale: ScaleObject, value: number) => {
  const range = scale.range();
  return (value - range[0]) / (range[1] - range[0]);
}

const invertLinearScale = (scale: ScaleObject, value: number) => {
  const ratio = getRangePointRatio(scale, value);
  return 0 <= ratio && ratio <= 1 ? scale.invert(value) : undefined;
};

const invertBandscaleRange = (scale: ScaleObject, value: number) => {
  const ratio = getRangePointRatio(scale, value);
  if (0 <= ratio && ratio <= 1) {
    const domain = scale.domain();
    const pos = Math.floor(ratio * domain.length);
    return domain[pos] || domain[domain.length];
  }
  return undefined;
};

/** @internal */
export const invert = (scale: ScaleObject, value: number) => (
  (scale.bandwidth ? invertBandscaleRange : invertLinearScale)(scale, value)
);

/** @internal */
export const boundsEqual = (scale: ScaleObject, b1: DomainBounds, b2: DomainBounds) => (
  scale.bandwidth ? b1[0] === b2[0] && b1[1] === b2[1] : rangesEqual(b1, b2)
);

const moveLinearScaleBounds = (
  scale: ScaleObject, bounds: DomainBounds, delta: number,
): DomainBounds => {
  const range = scaleBounds(scale, bounds);
  const sign = Math.sign(range[1] - range[0]);
  let new0 = invert(scale, range[0] - sign * delta);
  let new1 = invert(scale, range[1] - sign * delta);
  if (new0 === undefined) {
    new0 = scale.domain()[0];
    new1 = invert(scale, scale.range()[0] + range[1] - range[0]);
  }
  if (new1 === undefined) {
    new1 = scale.domain()[1];
    new0 = invert(scale, scale.range()[1] - range[1] + range[0]);
  }
  const newBounds: DomainBounds = [new0, new1];
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
  let new0 = range0 - rangeStep;
  let new1 = range1 - rangeStep;
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
  const range = scaleBounds(scale, bounds);
  const sign = Math.sign(range[1] - range[0]);
  const t = Math.abs((anchor - range[0]) / (range[1] - range[0]));
  let new0 = invert(scale, range[0] + sign * delta * 2 * t);
  let new1 = invert(scale, range[1] - sign * delta * 2 * (1 - t));
  if (new0 === undefined) {
    new0 = scale.domain()[0];
  }
  if (new1 === undefined) {
    new1 = scale.domain()[1];
  }
  const newBounds: DomainBounds = [new0, new1];
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

/** @internal */
export const invertBoundsRange = (scale: ScaleObject, range: NumberArray): DomainBounds => {
  let new0 = invert(scale, range[0]);
  let new1 = invert(scale, range[1]);
  if (new0 === undefined) {
    new0 = scale.domain()[0];
  }
  if (new1 === undefined) {
    new1 = scale.domain()[1];
  }
  return [new0, new1];
};

/** @internal */
export const fixOffset = (scale: ScaleObject): ((value: number) => number) => {
  const offset = getWidth(scale) / 2;
  return offset > 0 ? value => scale(value) + offset : scale;
};
