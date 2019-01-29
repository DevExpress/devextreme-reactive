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

const DISTANCE_THRESHOLD = 20;

const compareHitTargets = (t1, t2) => {
  const distanceDelta = t1.distance - t2.distance;
  if (Math.abs(distanceDelta) <= DISTANCE_THRESHOLD) {
    const orderDelta = t2.order - t1.order;
    return orderDelta !== 0 ? orderDelta : distanceDelta;
  }
  return distanceDelta;
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
    const location = getEventCoords(e);
    hitTesters = hitTesters || createHitTesters();
    const targets = [];
    seriesList.forEach(({ name: series, index: order, symbolName }) => {
      const status = hitTesters[symbolName](location);
      if (status) {
        targets.push(...status.points.map(
          point => ({
            series, point: point.index, distance: point.distance, order,
          }),
        ));
      }
    });
    targets.sort(compareHitTargets);
    const arg = { location, targets, event: e.nativeEvent };
    handlers.forEach(handler => handler(arg));
  };
};

const buildLeaveEventHandler = handlers => (e) => {
  const location = getEventCoords(e);
  const arg = { location, targets: [] };
  handlers.forEach(handler => handler(arg));
};

// The result is of Map<string, Function> type.
// Keys are DOM event names (https://developer.mozilla.org/en-US/docs/Web/Events).
export const buildEventHandlers = (seriesList, { clickHandlers, pointerMoveHandlers }) => {
  const handlers = {};
  if (clickHandlers.length) {
    handlers.click = buildEventHandler(seriesList, clickHandlers);
  }
  if (pointerMoveHandlers.length) {
    const moveHandler = buildEventHandler(seriesList, pointerMoveHandlers);
    const leaveHandler = buildLeaveEventHandler(pointerMoveHandlers);
    if ('onpointermove' in window) { // eslint-disable-line no-undef
      handlers.pointermove = moveHandler;
      handlers.pointerleave = leaveHandler;
    } else if ('ontouchmove' in window) { // eslint-disable-line no-undef
      handlers.touchmove = moveHandler;
      handlers.touchleave = leaveHandler;
    } else {
      handlers.mousemove = moveHandler;
      handlers.mouseleave = leaveHandler;
    }
  }
  return handlers;
};
