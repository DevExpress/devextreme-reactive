import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../constants';
import { ScaleObject } from '../types';

/** @internal */
export const isHorizontal = (name: string) => name === ARGUMENT_DOMAIN;

/** @internal */
export const getWidth = (scale: ScaleObject) => (
  scale.bandwidth ? scale.bandwidth() : 0
);

/** @internal */
export const getValueDomainName = (name?: string) => name || VALUE_DOMAIN;

/** @internal */
type FixedScaleFn = (value: number) => number;
/** @internal */
export const fixOffset = (scale: ScaleObject): FixedScaleFn => {
  const offset = getWidth(scale) / 2;
  return offset > 0 ? value => scale(value) + offset : scale;
};
