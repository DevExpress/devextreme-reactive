import * as series from './series';
import * as seriesCompoments from '../templates/series';
import { batchBindSeriesComponents } from '../utils';

// Is there a way to export all object entries without direct naming?
export const {
  AreaSeries,
  LineSeries,
  SplineSeries,
  ScatterSeries,
  BarSeries,
  PieSeries,
} = batchBindSeriesComponents(series, seriesCompoments);
