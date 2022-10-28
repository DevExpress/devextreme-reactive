const TIMEOUT = 180;

/** @internal */
export class TouchStrategy {
  delegate: any;
  touchStartTimeout: any;
  dragging: boolean;
  mouseInitialOffset: null;

  constructor(delegate) {
    this.delegate = delegate;
    this.touchStartTimeout = null;
    this.dragging = false;
    this.mouseInitialOffset = null;
  }

  isDragging() {
    return this.dragging;
  }

  isWaiting() {
    return !!this.touchStartTimeout;
  }

  cancelWaiting() {
    clearTimeout(this.touchStartTimeout);
    this.touchStartTimeout = undefined;
  }

  start(e) {
    const { clientX: x, clientY: y } = e.touches[0];
    this.touchStartTimeout = setTimeout(() => {
      this.delegate.onStart({ x, y });
      this.dragging = true;
    }, TIMEOUT);
  }

  move(e) {
    this.cancelWaiting();
    if (this.dragging) {
      const { clientX, clientY } = e.touches[0];
      e.preventDefault();
      this.delegate.onMove({ x: clientX, y: clientY });
    }
  }

  end(e) {
    this.cancelWaiting();
    if (this.dragging) {
      const { clientX, clientY } = e.changedTouches[0];
      this.delegate.onEnd({ x: clientX, y: clientY });
    }
    this.mouseInitialOffset = null;
    this.dragging = false;
  }
}
