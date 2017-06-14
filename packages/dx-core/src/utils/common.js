export const sortPlugins = (plugins) => {
  const result = plugins.slice();
  result.sort((a, b) => {
    const aPosition = a.position();
    const bPosition = b.position();
    for (let i = 0; i < Math.min(aPosition.length, bPosition.length); i += 1) {
      if (aPosition[i] < bPosition[i]) return -1;
      if (aPosition[i] > bPosition[i]) return 1;
    }
    return aPosition.length - bPosition.length;
  });
  return result;
};
