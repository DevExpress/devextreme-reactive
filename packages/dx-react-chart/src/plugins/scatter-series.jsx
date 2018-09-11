import { coordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import {
  makeSeries, withSeriesPlugin, withColor, bindSeriesComponents,
} from '../utils';

const SeriesWithSeries = withSeriesPlugin(
  withColor(makeSeries()), // TODO: d3Func is not used.
  'ScatterSeries',
  'scatter',
  computeCoordinates,
);

SeriesWithSeries.components = {
  seriesComponent: {
    name: 'PointCollection',
    exposedName: 'Path',
  },
  pointComponent: {
    name: 'Point',
    exposedName: 'Point',
  },
};

export const ScatterSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);
