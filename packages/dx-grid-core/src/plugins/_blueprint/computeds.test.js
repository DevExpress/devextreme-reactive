import {
    pureComputed,
} from './computeds';

describe('Plugin computeds', () => {
  describe('#pureComputed', () => {
    test('should work', () => {
      const arg1 = [];

      const computed = pureComputed(arg1);
      expect(computed).toBeUndefined();
    });
  });
});
