import { barCoordinates as computeCoordinates, getStartCoordinates, transformAnimation } from '@devexpress/dx-chart-core';
import { makeSeries, withColor, withComponents } from '../utils';
import { BarCollection as Path } from '../templates/series/bar-collection';
import { Bar as Point } from '../templates/series/bar';

export const BarSeries = withComponents({ Path, Point })(makeSeries(
  'BarSeries',
  'bar',
  null, // TODO: d3Func is not used.
  computeCoordinates,
  { getStartCoordinates, animationOptions: transformAnimation() },
  {
    seriesComponent: 'Path',
    pointComponent: 'Point',
  },
  withColor,
));
