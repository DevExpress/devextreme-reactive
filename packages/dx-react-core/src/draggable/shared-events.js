/* globals window:true */

import { EventEmitter } from '@devexpress/dx-core';

let eventEmitter = null;
export const getSharedEventEmitter = () => {
  if (!eventEmitter) {
    eventEmitter = new EventEmitter();

    ['mousemove', 'mouseup', 'touchmove', 'touchend', 'touchcancel']
      .forEach(name =>
        window.addEventListener(name, e => eventEmitter.emit([name, e]), { passive: false }));
  }
  return eventEmitter;
};

let touchEvents = false;
export const touchEventsSupported = () => {
  if (!touchEvents) {
    touchEvents = 'ontouchstart' in window;
  }
  return touchEvents;
};
