import { HORIZONTAL } from '../constants';

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

export const setScalePadding = (scale, padding = 0) => scale
  .paddingInner(padding).paddingOuter(padding / 2);

export const getWidth = scale => (scale.bandwidth ? scale.bandwidth() : 0);
