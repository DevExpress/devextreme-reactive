import { coordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor } from '../utils';

export const ScatterSeries = makeSeries(
  'ScatterSeries',
  'scatter',
  null, // TODO: d3Func is not used.
  computeCoordinates,
  {
    seriesComponent: {
      name: 'PointCollection',
      exposedName: 'Path',
    },
    pointComponent: {
      name: 'Point',
      exposedName: 'Point',
    },
  },
  withColor,
);
