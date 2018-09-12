import { dLine, coordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor } from '../utils';

export const LineSeries = makeSeries(
  'LineSeries',
  'line',
  dLine,
  coordinates,
  {
    seriesComponent: {
      name: 'Path',
      exposedName: 'Path',
    },
  },
  withColor,
);
