import {
  dLine, coordinates, getStartCoordinates, transformAnimation,
} from '@devexpress/dx-chart-core';
import { makeSeries, withColor, withComponents } from '../utils';
import { Path } from '../templates/series/path';

export const LineSeries = withComponents({ Path })(makeSeries(
  'LineSeries',
  'line',
  dLine,
  coordinates,
  { getStartCoordinates, animationOptions: transformAnimation() },
  {
    seriesComponent: 'Path',
  },
  withColor,
));
