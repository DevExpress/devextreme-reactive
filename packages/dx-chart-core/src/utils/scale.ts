import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../constants';
import {
  Scale, FixedScale,
} from '../types';

export const isHorizontal = (name: string): boolean => name === ARGUMENT_DOMAIN;

export const getWidth = (scale: Scale): number => (
  scale.bandwidth ? scale.bandwidth() : 0
);
// tslint:disable-next-line: ter-arrow-parens
export const getValueDomainName = (name?: string | undefined): string => name || VALUE_DOMAIN;

export const fixOffset = (scale: Scale): FixedScale => {
  const offset = getWidth(scale) / 2;
  return offset > 0 ? value => scale(value) + offset : scale;
};
