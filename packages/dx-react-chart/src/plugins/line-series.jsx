import { dLine, coordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor, withComponents } from '../utils';
import { Path } from '../templates/series/path';

export const LineSeries = withComponents({ Path })(makeSeries(
  'LineSeries',
  'line',
  dLine,
  coordinates,
  {
    seriesComponent: 'Path',
  },
  withColor,
));
