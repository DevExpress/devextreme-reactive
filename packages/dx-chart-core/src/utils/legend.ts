import { SeriesList, LegendItemList } from '../types';

const getDefaultLegendItems = (series: SeriesList): LegendItemList => series.map(
  ({ name: text, color }) => ({ text, color }),
);

const getPieLegendItems = (series: SeriesList): LegendItemList => series[0]
  .points.map(({ argument: text, color }) => ({ text, color }));

// The function supports special case when there is single Pie series.
// There is no common way to tell if series is PieSeries -
// checking `radius` props will suffice for now.
const isSinglePieSeriesCase = (series: SeriesList) => (
  series.length === 1 && 'innerRadius' in series[0] && 'outerRadius' in series[0]
);

/** @internal */
export const getLegendItems = (series: SeriesList) => (
  (isSinglePieSeriesCase(series) ? getPieLegendItems : getDefaultLegendItems)(series)
);
