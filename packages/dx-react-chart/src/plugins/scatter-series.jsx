import { coordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor, withComponents } from '../utils';
import { PointCollection as Path } from '../templates/series/point-collection';
import { Point } from '../templates/series/point';

export const ScatterSeries = withComponents({ Path, Point })(makeSeries(
  'ScatterSeries',
  'scatter',
  null, // TODO: d3Func is not used.
  computeCoordinates,
  {
    seriesComponent: 'Path',
    pointComponent: 'Point',
  },
  withColor,
));
