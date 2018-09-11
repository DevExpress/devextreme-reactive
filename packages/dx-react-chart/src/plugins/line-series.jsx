import { dLine, coordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { makeSeries, withColor } from '../utils';

export const LineSeries = withColor(makeSeries(
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
  seriesComponents,
));
