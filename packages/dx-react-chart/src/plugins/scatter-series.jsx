import { coordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor, withComponents } from '../utils';
import { PointCollection } from '../templates/series/point-collection';
import { Point } from '../templates/series/point';

export const ScatterSeries = withComponents({ PointCollection, Point })(makeSeries(
  'ScatterSeries',
  'scatter',
  null, // TODO: d3Func is not used.
  computeCoordinates,
  {
    seriesComponent: {
      name: 'PointCollection',
      exposedName: 'Path',
    },
    pointComponent: {
      name: 'Point',
      exposedName: 'Point',
    },
  },
  withColor,
));
