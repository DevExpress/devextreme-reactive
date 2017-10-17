import { getMessageFn } from './get-message-fn';

describe('#getMessageFn', () => {
  it('should return value by key', () => {
    const getMessage = getMessageFn({ info: 'abc' });
    expect(getMessage('info')).toBe('abc');
  });

  it('can use a pattern as a message', () => {
    const getMessage = getMessageFn({ info: '{a} {b} {c}' });
    expect(getMessage('info', { a: 'a', b: 'b', c: 'c' })).toBe('a b c');
  });

  it('can use a function as a message', () => {
    const getMessage = getMessageFn({ info: ({ a, b, c }) => `${a} ${b} ${c}` });
    expect(getMessage('info', { a: 'a', b: 'b', c: 'c' })).toBe('a b c');
  });
});
