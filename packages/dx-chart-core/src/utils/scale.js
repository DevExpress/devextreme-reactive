import { scaleLinear, scaleBand } from 'd3-scale';
import { HORIZONTAL, BAND } from '../constants';

const getScale = (scaleOption, type, padding) => {
  if (scaleOption && scaleOption.scale) {
    return scaleOption.scale();
  }
  return type !== BAND ? scaleLinear() : scaleBand()
    .paddingInner(padding).paddingOuter(padding / 2);
};

export const createScale = (
  { domain, orientation, type },
  width, height,
  scaleOption,
  padding = 0,
) => getScale(scaleOption, type, padding)
  .domain(domain)
  .range(orientation === HORIZONTAL ? [0, width] : [height, 0]);
