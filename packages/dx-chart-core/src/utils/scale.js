import { scaleLinear, scaleBand } from 'd3-scale';
import { HORIZONTAL, BAND } from '../constants';

export const createScale = (
  { domain, orientation, type },
  width, height,
  padding = 0,
) =>
  (type !== BAND ? scaleLinear() : scaleBand().paddingInner(padding).paddingOuter(padding / 2))
    .domain(domain)
    .range(orientation === HORIZONTAL ? [0, width] : [height, 0]);
