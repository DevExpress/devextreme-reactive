const getDefaultLegendItems = series => series.map(
  ({ uniqueName: text, color }) => ({ text, color }),
);

const getPieLegendItems = series => series[0]
  .points.map(({ id: text, color }) => ({ text, color }));

// The function supports special case when there is single Pie series.
// There is no commom way to tell if series is of Pie type -
// checking `seriesComponent` function name will suffice for now.
const isSinglePieSeriesCase = series => (
  series.length === 1 && series[0].seriesComponent.name === 'SliceCollection'
);

export const getLegendItems = series => (
  (isSinglePieSeriesCase(series) ? getPieLegendItems : getDefaultLegendItems)(series)
);
