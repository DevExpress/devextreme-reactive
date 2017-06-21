import extendWithEventListener from './extend-with-event-listener';

describe('extendWithEventListener', () => {
  const handler = jest.fn();

  it('can extend object with handler', () => {
    const extendedProps = extendWithEventListener({}, 'onClick', handler);
    extendedProps.onClick('a');

    expect(Object.keys(extendedProps)).toHaveLength(1);
    expect(handler.mock.calls).toHaveLength(1);
    expect(handler.mock.calls[0][0]).toBe('a');
  });
});
