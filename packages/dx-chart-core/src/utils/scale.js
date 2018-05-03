import { scaleLinear, scaleBand } from 'd3-scale';
import { HORIZONTAL, BAND } from '../constants';

export const createScale = ({ domain, orientation, type }, width, height) =>
  (type !== BAND ? scaleLinear() : scaleBand())
    .domain(domain)
    .range(orientation === HORIZONTAL ? [0, width] : [height, 0]);
