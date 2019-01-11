import { EventEmitter } from './event-emitter';

describe('EventEmitter', () => {
  it('should work', () => {
    const handler = jest.fn();
    const emitter = new EventEmitter();

    emitter.subscribe(handler);
    emitter.emit('test');

    expect(handler.mock.calls)
      .toEqual([['test']]);

    handler.mockReset();

    emitter.unsubscribe(handler);
    emitter.emit('test');

    expect(handler.mock.calls)
      .toEqual([]);
  });
});
