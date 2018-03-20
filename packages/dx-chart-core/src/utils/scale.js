import { scaleLinear, scaleBand } from 'd3-scale';

export const createScale = ({ domain, orientation, type }, width, height) =>
  (type !== 'band' ? scaleLinear() : scaleBand())
    .domain(domain)
    .range(orientation === 'horizontal' ? [0, width] : [height, 0]);
