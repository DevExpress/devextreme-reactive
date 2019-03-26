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

const adjustBandScaleMoveStep = (delta: number, step: number) => {
  const sign = Math.sign(step);
  const val = delta / step;
  if (val < 0.3) {
    return 0;
  }
  if (val < 0.5) {
    return sign;
  }
  return Math.round(val) * sign;
};

// Band case is processed separately to preserve to preserve categories amount in the bounds range.
// If common inversion mechanism is used start and end bounds cannot be inverted independently
// because of rounding issues which may add or remove categories to the new bounds.
// Another reason is step processing - while small values (less than 0.3) can be discarded, ones
// that are not so small but not big enough to be rounded up, cannot.
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
  scale: ScaleObject, bounds: DomainBounds, delta: number,
): DomainBounds => {
  const range = scaleBounds(scale, bounds);
  const sign = Math.sign(range[1] - range[0]);
  let new0 = invert(scale, range[0] + sign * delta);
  let new1 = invert(scale, range[1] - sign * delta);
  if (new0 === undefined) {
    new0 = scale.domain()[0];
  }
  if (new1 === undefined) {
    new1 = scale.domain()[1];
  }
  const newBounds: DomainBounds = [new0, new1];
  return rangesEqual(bounds, newBounds) ? bounds : newBounds;
};

// Let it be always 1 for now.
const adjustBandScaleGrowStep = (delta: number, step: number) => {
  return Math.sign(delta) * Math.sign(step);
};

const growBandScaleBounds = (
  scale: ScaleObject, bounds: DomainBounds, delta: number,
): DomainBounds => {
  const domain = scale.domain();
  const fullRange = scale.range();
  const step = (fullRange[1] - fullRange[0]) / domain.length;
  const rangeStep = adjustBandScaleGrowStep(delta, step);
  if (rangeStep === 0) {
    return bounds;
  }
  const range = scaleBounds(scale, bounds);
  const range0 = Math.round((range[0] - fullRange[0]) / step);
  const range1 = range0 + Math.round((range[1] - range[0]) / step) - 1;
  let new0 = range0 + rangeStep;
  let new1 = range1 - rangeStep;
  if (new0 < 0) {
    new0 = 0;
  }
  if (new1 > domain.length - 1) {
    new1 = domain.length - 1;
  }
  if ((new0 === range0 && new1 === range1) || new0 > new1) {
    return bounds;
  }
  return [domain[new0], domain[new1]];
};

/** @internal */
export const growBounds = (
  scale: ScaleObject, bounds: DomainBounds, delta: number,
) => (
  (scale.bandwidth ? growBandScaleBounds : growLinearScaleBounds)(scale, bounds, delta)
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
