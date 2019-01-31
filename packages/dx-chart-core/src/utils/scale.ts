import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../constants';
import { PureComputed } from '@devexpress/dx-core';
import {
  Scale, FixedScale,
} from '../types';

export const isHorizontal: PureComputed<[string], boolean> = name => name === ARGUMENT_DOMAIN;

export const getWidth: PureComputed<[Scale], number> = scale => (
  scale.bandwidth ? scale.bandwidth() : 0
);

// tslint:disable-next-line: ter-arrow-parens
export const getValueDomainName: PureComputed<[string]> = (name?) => name || VALUE_DOMAIN;

export const fixOffset: PureComputed<[Scale], FixedScale> = (scale) => {
  const offset = getWidth(scale) / 2;
  return offset > 0 ? value => scale(value) + offset : scale;
};
