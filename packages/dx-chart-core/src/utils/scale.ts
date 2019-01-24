import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../constants';

export const isHorizontal = name => name === ARGUMENT_DOMAIN;

export const getWidth = scale => (scale.bandwidth ? scale.bandwidth() : 0);

// tslint:disable-next-line: ter-arrow-parens
export const getValueDomainName = (name?) => name || VALUE_DOMAIN;

export const fixOffset = (scale) => {
  const offset = getWidth(scale) / 2;
  return offset > 0 ? value => scale(value) + offset : scale;
};
