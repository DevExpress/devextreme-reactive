import { PureComputed } from '@devexpress/dx-core';
import {
  Series, HandlersObject, Handler, TrackerTarget, EventHandlers,
} from '../types';

// This function is called from event handlers (when DOM is available) -
// *window* can be accessed safely.
const getEventCoords: PureComputed<[any], [number, number]> = (e) => {
  const { pageXOffset, pageYOffset } = window;
  const { left, top } = e.currentTarget.getBoundingClientRect();
  return [
    e.clientX - left - pageXOffset,
    e.clientY - top - pageYOffset,
  ];
};

const DISTANCE_THRESHOLD = 20;

const compareHitTargets: PureComputed<[TrackerTarget, TrackerTarget], number> = (t1, t2) => {
  const distanceDelta = t1.distance - t2.distance;
  if (Math.abs(distanceDelta) <= DISTANCE_THRESHOLD) {
    const orderDelta = t2.order - t1.order;
    return orderDelta !== 0 ? orderDelta : distanceDelta;
  }
  return distanceDelta;
};

const buildEventHandler: PureComputed<[Series[], Handler[]], any> = (seriesList, handlers) => {
  let hitTesters: any = null;

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
    const targets: TrackerTarget[] = [];
    seriesList.forEach(({ name: series, index: order, symbolName }) => {
      const status = hitTesters[symbolName](location);
      if (status) {
        targets.push(...status.points.map(
          point => ({
            series, order, point: point.index, distance: point.distance,
          }),
        ));
      }
    });
    targets.sort(compareHitTargets);
    const arg = { location, targets, event: e.nativeEvent };
    handlers.forEach(handler => handler(arg));
  };
};

const buildLeaveEventHandler: PureComputed<[Handler[]], PureComputed<[any]>> = handlers => (e) => {
  const location = getEventCoords(e);
  const arg = { location, targets: [] };
  handlers.forEach(handler => handler(arg));
};

// The result is of Map<string, Function> type.
// Keys are DOM event names (https://developer.mozilla.org/en-US/docs/Web/Events).
export const buildEventHandlers: PureComputed<
  [Series[], HandlersObject], EventHandlers
> = (seriesList, { clickHandlers, pointerMoveHandlers }) => {
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
