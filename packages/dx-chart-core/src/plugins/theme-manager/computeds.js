
const Palette = ['#2196F3', '#F44336', '#4CAF50', '#FFEB3B', '#E91E63', '#9C27B0'];

const getColor = index => Palette[index % Palette.length];

export const palette = series => series.map((singleSeries, index) => ({
  ...singleSeries,
  themeColor: getColor(index),
}));
