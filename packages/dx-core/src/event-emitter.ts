type Handler = (e: object) => void;

/** @internal */
export class EventEmitter {
  private handlers: Handler[];

  constructor() {
    this.handlers = [];
  }

  emit(e) {
    this.handlers.forEach(handler => handler(e));
  }

  subscribe(handler) {
    this.handlers.push(handler);
  }

  unsubscribe(handler) {
    this.handlers.splice(this.handlers.indexOf(handler), 1);
  }
}
