import { Target, Location, TargetList, SeriesList, HitTestFn } from '../types';

type EventHandlerFn = (e: any) => void;
type HandlerArg = {
  readonly location: Location;
  readonly targets: TargetList;
  readonly event?: any;
};
type HandlerFn = (arg: HandlerArg) => void;
type HandlerFnList = ReadonlyArray<HandlerFn>;

type HitTesters = {
  [series: string]: HitTestFn;
};

type TrackerTarget = Target & {
  readonly distance: number;
  readonly order: number;
};

// This function is called from event handlers (when DOM is available) -
// *window* can be accessed safely.
const getEventCoords = (e: any): Location => {
  const { pageXOffset, pageYOffset } = window;
  const { left, top } = e.currentTarget.getBoundingClientRect();
  return [
    e.clientX - left - pageXOffset,
    e.clientY - top - pageYOffset,
  ];
};

const DISTANCE_THRESHOLD = 20;

const compareHitTargets = (t1: TrackerTarget, t2: TrackerTarget) => {
  const distanceDelta = t1.distance - t2.distance;
  if (Math.abs(distanceDelta) <= DISTANCE_THRESHOLD) {
    const orderDelta = t2.order - t1.order;
    return orderDelta !== 0 ? orderDelta : distanceDelta;
  }
  return distanceDelta;
};

const buildEventHandler = (seriesList: SeriesList, handlers: HandlerFnList): EventHandlerFn => {
  let hitTesters: HitTesters | null = null;

  const createHitTesters = () => {
    const obj: HitTesters = {};
    seriesList.forEach((seriesItem) => {
      obj[seriesItem.symbolName] = seriesItem.createHitTester(seriesItem.points);
    });
    return obj;
  };

  return (e) => {
    const location = getEventCoords(e);
    hitTesters = hitTesters || createHitTesters();
    const targets: TrackerTarget[] = [];
    seriesList.forEach(({ name: series, index: order, symbolName }) => {
      const status = hitTesters![symbolName](location);
      if (status) {
        targets.push(...status.points.map(
          point => ({
            series, order, point: point.index, distance: point.distance,
          }),
        ));
      }
    });
    targets.sort(compareHitTargets);
    const arg: HandlerArg = { location, targets, event: e.nativeEvent };
    handlers.forEach(handler => handler(arg));
  };
};

const buildLeaveEventHandler = (handlers: HandlerFnList): EventHandlerFn => (e) => {
  const location = getEventCoords(e);
  const arg: HandlerArg = { location, targets: [] };
  handlers.forEach(handler => handler(arg));
};

type EventHandlers = {
  click?: EventHandlerFn;
  pointermove?: EventHandlerFn;
  pointerleave?: EventHandlerFn;
  touchmove?: EventHandlerFn;
  touchleave?: EventHandlerFn;
  mousemove?: EventHandlerFn;
  mouseleave?: EventHandlerFn;
};

type HandlersObject = {
  readonly clickHandlers: HandlerFnList;
  readonly pointerMoveHandlers: HandlerFnList;
};

// The result is of Map<string, Function> type.
// Keys are DOM event names (https://developer.mozilla.org/en-US/docs/Web/Events).
export const buildEventHandlers = (
  seriesList: SeriesList, { clickHandlers, pointerMoveHandlers }: HandlersObject,
) => {
  const handlers: EventHandlers = {};
  if (clickHandlers.length) {
    handlers.click = buildEventHandler(seriesList, clickHandlers);
  }
  if (pointerMoveHandlers.length) {
    const moveHandler = buildEventHandler(seriesList, pointerMoveHandlers);
    const leaveHandler = buildLeaveEventHandler(pointerMoveHandlers);
    if ('onpointermove' in window) {
      handlers.pointermove = moveHandler;
      handlers.pointerleave = leaveHandler;
    } else if ('ontouchmove' in window) {
      handlers.touchmove = moveHandler;
      handlers.touchleave = leaveHandler;
    } else {
      handlers.mousemove = moveHandler;
      handlers.mouseleave = leaveHandler;
    }
  }
  return handlers;
};
