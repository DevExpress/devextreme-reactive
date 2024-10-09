/* globals window:true */

import { EventEmitter } from '@devexpress/dx-core';

let eventEmitter;
/** @internal */
export const getSharedEventEmitter = () => {
  if (!eventEmitter) {
    eventEmitter = new EventEmitter();

    ['mousemove', 'mouseup', 'touchmove', 'touchend', 'touchcancel', 'contextmenu']
      .forEach(name => window.addEventListener(
        name, e => eventEmitter.emit([name, e]), { passive: false },
      ));
  }
  return eventEmitter;
};
