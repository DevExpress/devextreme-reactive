import { dSpline, coordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import {
  makeSeries, withSeriesPlugin, withColor, bindSeriesComponents,
} from '../utils';

const SeriesWithSeries = withSeriesPlugin(
  withColor(makeSeries(dSpline)),
  'SplineSeries',
  'spline',
  coordinates,
);

SeriesWithSeries.components = {
  seriesComponent: {
    name: 'Path',
    exposedName: 'Path',
  },
};

export const SplineSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);
