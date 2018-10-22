import { dArea, getAreaPointTransformer, createAreaHitTester } from '@devexpress/dx-chart-core';
import { makeSeries, withComponents } from '../utils';
import { Area as Path } from '../templates/series/area';

export const AreaSeries = withComponents({ Path })(makeSeries(
  'AreaSeries',
  'area',
  dArea,
  getAreaPointTransformer,
  {
    seriesComponent: 'Path',
  },
  createAreaHitTester,
));
