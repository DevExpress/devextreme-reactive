import { dArea, coordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { makeSeries, withColor } from '../utils';

export const AreaSeries = withColor(makeSeries(
  'AreaSeries',
  'area',
  dArea,
  coordinates,
  {
    seriesComponent: {
      name: 'Area',
      exposedName: 'Path',
    },
  },
  seriesComponents,
));
