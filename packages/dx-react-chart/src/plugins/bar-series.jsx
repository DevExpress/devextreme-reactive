import { barCoordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor } from '../utils';

export const BarSeries = makeSeries(
  'BarSeries',
  'bar',
  null, // TODO: d3Func is not used.
  computeCoordinates,
  {
    seriesComponent: {
      name: 'BarCollection',
      exposedName: 'Path',
    },
    pointComponent: {
      name: 'Bar',
      exposedName: 'Point',
    },
  },
  withColor,
);
