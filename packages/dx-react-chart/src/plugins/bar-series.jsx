import { barCoordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import {
  makeSeries, withSeriesPlugin, withColor, bindSeriesComponents,
} from '../utils';

const SeriesWithSeries = withSeriesPlugin(
  withColor(makeSeries()), // TODO: d3Func is not used.
  'BarSeries',
  'bar',
  computeCoordinates,
);

SeriesWithSeries.components = {
  seriesComponent: {
    name: 'BarCollection',
    exposedName: 'Path',
  },
  pointComponent: {
    name: 'Bar',
    exposedName: 'Point',
  },
};

export const BarSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);
