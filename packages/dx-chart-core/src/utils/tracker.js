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

const CREATED = Symbol('HIT_TESTERS');

const createHitTesters = (seriesList, hitTesters) => {
  hitTesters[CREATED] = true; // eslint-disable-line no-param-reassign
  seriesList.forEach((seriesItem) => {
    // eslint-disable-next-line no-param-reassign
    hitTesters[seriesItem.symbolName] = seriesItem.createHitTester(seriesItem.points);
  });
};

const selectTarget = targets => targets[targets.length - 1] || null;

const processEvent = (seriesList, hitTesters, e) => {
  const coords = getEventCoords(e);
  const targets = [];
  if (!hitTesters[CREATED]) {
    createHitTesters(seriesList, hitTesters);
  }
  seriesList.forEach(({ symbolName, name }) => {
    const status = hitTesters[symbolName](coords);
    if (status) {
      targets.push({ series: name, ...status });
    }
  });
  const target = selectTarget(targets);
  return { target, coords };
};

const createClickHandler = (seriesList, hitTesters, handlers) => (e) => {
  const arg = processEvent(seriesList, hitTesters, e);
  handlers.forEach(handler => handler(arg));
};

const compareTargets = (target1, target2) => (
  (target1 && target2 && target1.series === target2.series && target1.point === target2.point)
    || (!target1 && !target2)
);

const createHoverChangeHandler = (seriesList, hitTesters, handlers, context) => {
  const move = (e) => {
    const arg = processEvent(seriesList, hitTesters, e);
    if (!compareTargets(context.hoverTarget, arg.target)) {
      context.hoverTarget = arg.target; // eslint-disable-line no-param-reassign
      handlers.forEach(handler => handler(arg));
    }
  };
  const leave = (e) => {
    if (context.hoverTarget) {
      context.hoverTarget = null; // eslint-disable-line no-param-reassign
      const arg = { coords: getEventCoords(e), target: null };
      handlers.forEach(handler => handler(arg));
    }
  };
  return [move, leave];
};

// Context is used in hover changes tracking - to prevent excessive *hoverChange* events
// when pointer is moving over the same target.
export const buildEventHandlers = (seriesList, context, { click, hoverChange }) => {
  const hitTesters = {};
  const handlers = {};
  if (click.length) {
    handlers.click = createClickHandler(seriesList, hitTesters, click);
  }
  if (hoverChange.length) {
    const [move, leave] = createHoverChangeHandler(seriesList, hitTesters, hoverChange, context);
    handlers.pointermove = move;
    handlers.pointerleave = leave;
  }
  return handlers;
};
