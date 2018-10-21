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

const buildEventHandler = (seriesList, handlers) => {
  let hitTesters = null;

  const createHitTesters = () => {
    const obj = {};
    seriesList.forEach((seriesItem) => {
      obj[seriesItem.symbolName] = seriesItem.createHitTester(seriesItem.points);
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

export const buildEventHandlers = (seriesList, { clickHandlers, pointerMoveHandlers }) => {
  const handlers = {};
  if (clickHandlers.length) {
    handlers.click = buildEventHandler(seriesList, clickHandlers);
  }
  if (pointerMoveHandlers.length) {
    handlers.pointermove = buildEventHandler(seriesList, pointerMoveHandlers);
    handlers.pointerleave = buildLeaveEventHandler(pointerMoveHandlers);
  }
  return handlers;
};
