import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../constants';
import { Scale } from '../types';

export const isHorizontal = (name: string) => name === ARGUMENT_DOMAIN;

export const getWidth = (scale: Scale) => (
  scale.bandwidth ? scale.bandwidth() : 0
);

export const getValueDomainName = (name?: string) => name || VALUE_DOMAIN;

/** @internal */
type FixedScaleFn = (value: number) => number;
/** @internal */
export const fixOffset = (scale: Scale): FixedScaleFn => {
  const offset = getWidth(scale) / 2;
  return offset > 0 ? value => scale(value) + offset : scale;
};
