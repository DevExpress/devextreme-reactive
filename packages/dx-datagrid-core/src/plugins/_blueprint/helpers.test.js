import {
    pureHelper,
} from './helpers';

describe('Plugin helpers', () => {
  describe('#_pureHelper', () => {
    test('should work', () => {
      const arg1 = [];

      const value = pureHelper(arg1);
      expect(value).toBeUndefined();
    });
  });
});
