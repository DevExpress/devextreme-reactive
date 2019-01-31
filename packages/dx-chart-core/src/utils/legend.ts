import { PureComputed } from '@devexpress/dx-core';
import {
  GetLegendItemsFn, Series,
} from '../types';

const getDefaultLegendItems: GetLegendItemsFn = series => series.map(
  ({ name: text, color }) => ({ text, color }),
);

const getPieLegendItems: GetLegendItemsFn = series => series[0]
  .points.map(({ argument: text, color }) => ({ text, color }));

// The function supports special case when there is single Pie series.
// There is no common way to tell if series is PieSeries -
// checking `radius` props will suffice for now.
const isSinglePieSeriesCase: PureComputed<[Series[]], boolean> = series => (
  series.length === 1 && 'innerRadius' in series[0] && 'outerRadius' in series[0]
);

export const getLegendItems: GetLegendItemsFn = series => (
  (isSinglePieSeriesCase(series) ? getPieLegendItems : getDefaultLegendItems)(series)
);
