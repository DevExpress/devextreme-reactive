const TIMEOUT = 180;

export class TouchStrategy {
  constructor(delegate) {
    this.delegate = delegate;
    this.touchStartTimeout = null;
    this.dragging = false;
  }
  start(e) {
    const { clientX: x, clientY: y } = e.touches[0];
    this.touchStartTimeout = setTimeout(() => {
      this.delegate.onStart({ x, y });
      this.dragging = true;
    }, TIMEOUT);
  }
  move(e) {
    clearTimeout(this.touchStartTimeout);
    if (this.dragging) {
      const { clientX, clientY } = e.touches[0];
      e.preventDefault();
      this.delegate.onMove({ x: clientX, y: clientY });
    }
  }
  end(e) {
    clearTimeout(this.touchStartTimeout);
    if (this.dragging) {
      const { clientX, clientY } = e.changedTouches[0];
      this.delegate.onEnd({ x: clientX, y: clientY });
    }
    this.mouseInitialOffset = null;
    this.dragging = false;
  }
}
