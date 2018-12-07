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

const compare = (t1, t2) => t1.distance - t2.distance;

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
    const location = getEventCoords(e);
    hitTesters = hitTesters || createHitTesters();
    const targets = [];
    seriesList.forEach(({ name: series, symbolName }) => {
      const status = hitTesters[symbolName](location);
      if (status) {
        targets.push(...status.points.map(
          point => ({ series, point: point.index, distance: point.distance }),
        ));
      }
    });
    targets.sort(compare);
    const arg = { location, targets, event: e.nativeEvent };
    handlers.forEach(handler => handler(arg));
  };
};

const buildLeaveEventHandler = handlers => (e) => {
  const location = getEventCoords(e);
  const arg = { location, targets: [] };
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
