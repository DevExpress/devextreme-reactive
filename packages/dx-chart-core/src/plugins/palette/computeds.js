import { scaleOrdinal } from 'd3-scale';

export const palette = (series, scheme) => scaleOrdinal()
  .domain(series.map(({ uniqueName }) => uniqueName))
  .range(scheme);
