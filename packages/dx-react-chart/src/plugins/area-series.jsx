import { dArea, coordinates, getStartCoordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor, withComponents } from '../utils';
import { Area as Path } from '../templates/series/area';

export const AreaSeries = withComponents({ Path })(makeSeries(
  'AreaSeries',
  'area',
  dArea,
  coordinates,
  { getStartCoordinates, animationName: 'transform' },
  {
    seriesComponent: 'Path',
  },
  withColor,
));
