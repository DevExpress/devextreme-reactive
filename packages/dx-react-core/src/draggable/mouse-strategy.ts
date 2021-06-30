/* globals window:true document:true */

import { toggleGestureCover } from './gesture-cover';
import { clear } from './selection-utils';

const BOUNDARY = 10;
const clamp = (value, min, max) => Math.max(Math.min(value, max), min);
const isBoundExceeded = (
  { x: initialX, y: initialY }, { x, y },
) => clamp(x, initialX - BOUNDARY, initialX + BOUNDARY) !== x
  || clamp(y, initialY - BOUNDARY, initialY + BOUNDARY) !== y;

/** @internal */
export class MouseStrategy {
  delegate: any;
  mouseInitialOffset: any;
  dragging: boolean;
  e: any;

  constructor(delegate) {
    this.delegate = delegate;
    this.mouseInitialOffset = null;
    this.dragging = false;
  }

  isDragging() {
    return this.dragging;
  }

  start(e) {
    const { clientX: x, clientY: y } = e;
    this.e = e;
    this.mouseInitialOffset = { x, y };
  }

  move(e) {
    const { clientX: x, clientY: y } = e;
    let dragStarted = false;
    if (!this.dragging && this.mouseInitialOffset) {
      if (isBoundExceeded(this.mouseInitialOffset, { x, y })) {
        this.delegate.onStart(this.mouseInitialOffset);
        clear();
        dragStarted = true;
        this.dragging = true;
      }
    }
    if (this.dragging) {
      e.preventDefault();
      this.delegate.onMove({ x, y });
    }
    if (dragStarted) {
      const element = document.elementFromPoint(x, y);
      const cursor = element ? window.getComputedStyle(element).cursor : null;
      toggleGestureCover(true, cursor);
    }
  }

  end(e) {
    if (this.dragging) {
      const { clientX: x, clientY: y } = e;
      toggleGestureCover(false);
      this.delegate.onEnd({ x, y });
    }
    this.mouseInitialOffset = null;
    this.dragging = false;
  }
}
