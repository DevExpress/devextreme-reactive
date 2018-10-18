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

// TODO: First argument should be just a series list.
const buildEventHandler = ({
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
        targets.push({ series: seriesItem.name, ...status });
      }
    });
    const arg = { coords, targets };
    handlers.forEach(handler => handler(arg));
  };
};

const buildLeaveEventHandler = handlers => (e) => {
  const coords = getEventCoords(e);
  const arg = { coords, targets: [] };
  handlers.forEach(handler => handler(arg));
};

export const buildEventHandlers = (context, { clickHandlers, pointerMoveHandlers }) => {
  const handlers = {};
  if (clickHandlers.length) {
    handlers.click = buildEventHandler(context, clickHandlers);
  }
  if (pointerMoveHandlers.length) {
    handlers.pointermove = buildEventHandler(context, pointerMoveHandlers);
    handlers.pointerleave = buildLeaveEventHandler(pointerMoveHandlers);
  }
  return handlers;
};
