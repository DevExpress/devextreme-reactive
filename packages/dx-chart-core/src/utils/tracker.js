// This function is called from event handlers (when DOM is available) -
// *window* can be accessed safely.
const getEventCoords = (e) => {
  const { pageXOffset, pageYOffset } = window; // eslint-disable-line no-undef
  const { left, top } = e.currentTarget.getBoundingClientRect();
  return [
    e.clientX - left - pageXOffset,
    e.clientY - top - pageYOffset,
  ];
};

export const buildEventHandler = ({
  series: seriesList,
  getSeriesPoints, data, scales,
  stacks, scaleExtension,
}, handlers) => {
  let hitTesters = null;

  const createHitTesters = () => {
    const obj = {};
    seriesList.forEach((seriesItem) => {
      // TODO: Calculate series coodinates in a separate getter and remove `getSeriesPoints`.
      const coordinates = getSeriesPoints(seriesItem, data, scales, stacks, scaleExtension);
      obj[seriesItem.symbolName] = seriesItem.createHitTester(coordinates);
    });
    return obj;
  };

  return (e) => {
    const coords = getEventCoords(e);
    hitTesters = hitTesters || createHitTesters();
    const targets = [];
    seriesList.forEach((seriesItem) => {
      const status = hitTesters[seriesItem.symbolName](coords);
      if (status) {
        targets.push({ name: seriesItem.name, ...status });
      }
    });
    const arg = { coords, targets };
    handlers.forEach(handler => handler(arg));
  };
};
