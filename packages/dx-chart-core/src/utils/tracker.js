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
  const obj = { [CREATED]: true };
  seriesList.forEach((seriesItem) => {
    obj[seriesItem.symbolName] = seriesItem.createHitTester(seriesItem.points);
  });
  Object.assign(hitTesters, obj);
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

const createHoverChangeHandler = (seriesList, hitTesters, handlers) => {
  let currentTarget = null;
  const move = (e) => {
    const arg = processEvent(seriesList, hitTesters, e);
    if (!compareTargets(currentTarget, arg.target)) {
      currentTarget = arg.target;
      handlers.forEach(handler => handler(arg));
    }
  };
  const leave = (e) => {
    if (currentTarget) {
      currentTarget = null;
      const arg = { coords: getEventCoords(e), target: null };
      handlers.forEach(handler => handler(arg));
    }
  };
  return [move, leave];
};

export const buildEventHandlers = (seriesList, { click, hoverChange }) => {
  const hitTesters = {};
  const handlers = {};
  if (click.length) {
    handlers.click = createClickHandler(seriesList, hitTesters, click);
  }
  if (hoverChange.length) {
    const [move, leave] = createHoverChangeHandler(seriesList, hitTesters, hoverChange);
    handlers.pointermove = move;
    handlers.pointerleave = leave;
  }
  return handlers;
};
