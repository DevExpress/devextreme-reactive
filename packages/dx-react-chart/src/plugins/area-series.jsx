import { dArea, coordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor } from '../utils';

export const AreaSeries = makeSeries(
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
  withColor,
);
