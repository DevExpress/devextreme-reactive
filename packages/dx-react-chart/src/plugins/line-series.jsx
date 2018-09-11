import { dLine, coordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import {
  makeSeries, withSeriesPlugin, withColor, bindSeriesComponents,
} from '../utils';

const SeriesWithSeries = withSeriesPlugin(
  withColor(makeSeries(dLine)),
  'LineSeries',
  'line',
  coordinates,
);

SeriesWithSeries.components = {
  seriesComponent: {
    name: 'Path',
    exposedName: 'Path',
  },
};

export const LineSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);
