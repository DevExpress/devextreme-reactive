import { getMessagesFormatter } from './messages-formatter';

describe('#getMessagesFormatter', () => {
  it('should return value by key', () => {
    const getMessage = getMessagesFormatter({ info: 'abc' });
    expect(getMessage('info')).toBe('abc');
  });

  it('can use a pattern as a message', () => {
    const getMessage = getMessagesFormatter({ info: '{a} {b} {c}' });
    expect(getMessage('info', { a: 'a', b: 'b', c: 'c' })).toBe('a b c');
  });

  it('can use a function as a message', () => {
    const getMessage = getMessagesFormatter({ info: ({ a, b, c }) => `${a} ${b} ${c}` });
    expect(getMessage('info', { a: 'a', b: 'b', c: 'c' })).toBe('a b c');
  });

  it('should return empty string if value is not defined', () => {
    const getMessage = getMessagesFormatter({ info: undefined });
    expect(getMessage('info')).toBe('');
    expect(getMessage('undeclared')).toBe('');
  });
});
