export class EventEmitter {
  constructor() {
    this.subscriptions = [];
  }
  emit(e) {
    this.subscriptions.forEach(subscription => subscription(e));
  }
  subscribe(subscription) {
    this.subscriptions.push(subscription);
  }
  unsubscribe(subscription) {
    this.subscriptions.splice(this.subscriptions.indexOf(subscription), 1);
  }
}
