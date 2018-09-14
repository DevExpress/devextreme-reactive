import { dArea, coordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor, withComponents } from '../utils';
import { Area } from '../templates/series/area';

export const AreaSeries = withComponents({ Area })(makeSeries(
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
));
