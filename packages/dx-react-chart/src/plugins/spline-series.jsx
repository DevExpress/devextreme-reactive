import { dSpline, coordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { makeSeries, withColor } from '../utils';

export const SplineSeries = withColor(makeSeries(
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
  seriesComponents,
));
