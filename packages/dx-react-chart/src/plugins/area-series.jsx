import { dArea, coordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import {
  makeSeries, withSeriesPlugin, withColor, bindSeriesComponents,
} from '../utils';

const SeriesWithSeries = withSeriesPlugin(
  withColor(makeSeries(dArea)),
  'AreaSeries',
  'area',
  coordinates,
);

SeriesWithSeries.components = {
  seriesComponent: {
    name: 'Area',
    exposedName: 'Path',
  },
};

export const AreaSeries = bindSeriesComponents(seriesComponents)(SeriesWithSeries);
