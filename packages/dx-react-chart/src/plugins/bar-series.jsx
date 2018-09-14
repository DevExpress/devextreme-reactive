import { barCoordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withColor, withComponents } from '../utils';
import { BarCollection } from '../templates/series/bar-collection';
import { Bar } from '../templates/series/bar';

export const BarSeries = withComponents({ BarCollection, Bar })(makeSeries(
  'BarSeries',
  'bar',
  null, // TODO: d3Func is not used.
  computeCoordinates,
  {
    seriesComponent: {
      name: 'BarCollection',
      exposedName: 'Path',
    },
    pointComponent: {
      name: 'Bar',
      exposedName: 'Point',
    },
  },
  withColor,
));
