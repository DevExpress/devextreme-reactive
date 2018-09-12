import { dSpline, coordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor } from '../utils';

export const SplineSeries = makeSeries(
  'SplineSeries',
  'spline',
  dSpline,
  coordinates,
  {
    seriesComponent: {
      name: 'Path',
      exposedName: 'Path',
    },
  },
  withColor,
);
