import { HORIZONTAL, VALUE_DOMAIN } from '../constants';

export const createScale = (
  { domain, orientation },
  width, height,
  constructor,
) => {
  const scale = constructor();
  return scale
    .domain(domain)
    .range(orientation === HORIZONTAL ? [0, width] : [height, 0]);
};

export const getWidth = scale => (scale.bandwidth ? scale.bandwidth() : 0);

export const getValueDomainName = name => name || VALUE_DOMAIN;

export const fixOffset = (scale) => {
  const offset = getWidth(scale) / 2;
  return offset > 0 ? value => scale(value) + offset : scale;
};
