export const getLegendItems = series => series.map(
  ({ uniqueName: text, color }) => ({ text, color }),
);
