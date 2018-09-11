import { series, batchBindSeriesComponents } from '@devexpress/dx-react-chart';
import * as seriesComponents from '../templates/series';

// Is there a way to export all object entries without direct naming?
export const {
  AreaSeries,
  LineSeries,
  SplineSeries,
  ScatterSeries,
  BarSeries,
  PieSeries,
} = batchBindSeriesComponents(series, seriesComponents);
