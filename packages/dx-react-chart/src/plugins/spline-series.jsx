import { dSpline, coordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor, withComponents } from '../utils';
import { Path } from '../templates/series/path';

export const SplineSeries = withComponents({ Path })(makeSeries(
  'SplineSeries',
  'spline',
  dSpline,
  coordinates,
  {
    seriesComponent: 'Path',
  },
  withColor,
));
