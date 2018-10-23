import { dSpline, getAreaPointTransformer, createSplineHitTester } from '@devexpress/dx-chart-core';
import { makeSeries, withComponents } from '../utils';
import { Path } from '../templates/series/path';

export const SplineSeries = withComponents({ Path })(makeSeries(
  'SplineSeries',
  'spline',
  dSpline,
  getAreaPointTransformer,
  {
    seriesComponent: 'Path',
  },
  createSplineHitTester,
));
