import { pieAttributes } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { makeSeries, withSeriesPlugin, bindSeriesComponents } from '../utils';

const SeriesWithSeries = withSeriesPlugin(
  makeSeries(), // TODO: d3Func is not used.
  'PieSeries',
  'arc',
  pieAttributes,
);

SeriesWithSeries.components = {
  seriesComponent: {
    name: 'SliceCollection',
    exposedName: 'Path',
  },
  pointComponent: {
    name: 'Slice',
    exposedName: 'Point',
  },
};

export const PieSeries = bindSeriesComponents(seriesComponents)(SeriesWithSeries);
