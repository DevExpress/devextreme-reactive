import { dLine, getAreaPointTransformer } from '@devexpress/dx-chart-core';
import { makeSeries, withComponents } from '../utils';
import { Path } from '../templates/series/path';

export const LineSeries = withComponents({ Path })(makeSeries(
  'LineSeries',
  'line',
  dLine,
  getAreaPointTransformer,
  {
    seriesComponent: 'Path',
  },
));
