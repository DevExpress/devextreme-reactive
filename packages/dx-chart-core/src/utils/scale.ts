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

/** @internal */
export const makeScale = ({ factory, domain }: DomainInfo, range: NumberArray) => (
  (factory || scaleLinear)().domain(domain).range(range)
);

// Though this function is used only in *Viewport* plugin (and so should be placed right there),
// it resides here so that internal scale specifics (*getWidth*)
// are encapsulated in this utility file.
/** @internal */
export const scaleBounds = (scale: ScaleObject, bounds: DomainBounds): NumberArray => (
  [scale(bounds[0]), scale(bounds[1]) + getWidth(scale)]
);

/** @internal */
export const fixOffset = (scale: ScaleObject): ((value: number) => number) => {
  const offset = getWidth(scale) / 2;
  return offset > 0 ? value => scale(value) + offset : scale;
};
