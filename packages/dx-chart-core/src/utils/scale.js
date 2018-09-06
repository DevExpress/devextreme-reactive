import { HORIZONTAL } from '../constants';

export const createScale = (
  { domain, orientation },
  width, height,
  constructor,
  padding = 0,
) => {
  const scale = constructor();
  if (scale.paddingInner) {
    scale.paddingInner(padding).paddingOuter(padding / 2);
  }
  return scale
    .domain(domain)
    .range(orientation === HORIZONTAL ? [0, width] : [height, 0]);
};

export const getWidth = scale => (scale.bandwidth ? scale.bandwidth() : 0);
