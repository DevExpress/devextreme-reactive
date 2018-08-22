import { scaleOrdinal } from 'd3-scale';

const PALETTE = ['#2196F3', '#F44336', '#4CAF50', '#FFEB3B', '#E91E63', '#9C27B0'];


export const palette = series => scaleOrdinal()
  .domain(series.map(({ uniqueName }) => uniqueName))
  .range(PALETTE);
