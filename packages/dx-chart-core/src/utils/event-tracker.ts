import { hasWindow } from '@devexpress/dx-core';
import { getEventCoords, getOffset } from './common';
import {
  TrackerTarget, HandlerFnList, SeriesList, HitTesters,
  EventHandlerFn, TargetData, EventHandlers, HandlersObject,
} from '../types';

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
      obj[seriesItem.symbolName as unknown as string] = seriesItem
      .createHitTester(seriesItem.points, seriesItem.rotated);
    });
    return obj;
  };

  return (e) => {
    const location = getEventCoords(e, getOffset(e.currentTarget));
    hitTesters = hitTesters || createHitTesters();
    const targets: TrackerTarget[] = [];
    seriesList.forEach(({ name: series, index: order, symbolName }) => {
      const status = hitTesters![symbolName as unknown as string](location);
      if (status) {
        targets.push(...status.points.map(
          point => ({
            series, order, point: point.index, distance: point.distance,
          }),
        ));
      }
    });
    targets.sort(compareHitTargets);
    const arg: TargetData = { location, targets, event: e.nativeEvent };
    handlers.forEach(handler => handler(arg));
  };
};

const buildLeaveEventHandler = (handlers: HandlerFnList): EventHandlerFn => (e) => {
  const location = getEventCoords(e, getOffset(e.currentTarget));
  const arg: TargetData = { location, targets: [] };
  handlers.forEach(handler => handler(arg));
};

// The result is of Map<string, Function> type.
// Keys are DOM event names (https://developer.mozilla.org/en-US/docs/Web/Events).
/** @internal */
export const buildEventHandlers = (
  seriesList: SeriesList, { clickHandlers, pointerMoveHandlers }: HandlersObject,
) => {
  const handlers: EventHandlers = {};
  if (!hasWindow()) return handlers;
  if (clickHandlers.length) {
    handlers.click = buildEventHandler(seriesList, clickHandlers);
  }
  if (pointerMoveHandlers.length) {
    const moveHandler = buildEventHandler(seriesList, pointerMoveHandlers);
    const leaveHandler = buildLeaveEventHandler(pointerMoveHandlers);
    if ('ontouchstart' in window) {
      handlers.touchstart = moveHandler;
    } else {
      handlers.mousemove = moveHandler;
      handlers.mouseleave = leaveHandler;
    }
  }
  return handlers;
};
