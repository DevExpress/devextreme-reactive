import { memoize } from './memoize';

describe('memoize', () => {
  it('should work correctly', () => {
    const func = jest.fn();
    const memoizedFunc = memoize(func);

    memoizedFunc(1);
    memoizedFunc(1);
    memoizedFunc(2);

    expect(func)
      .toHaveBeenCalledTimes(2);
    expect(func.mock.calls[0][0])
      .toBe(1);
    expect(func.mock.calls[1][0])
      .toBe(2);
  });
});
