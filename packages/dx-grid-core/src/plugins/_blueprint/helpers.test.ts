import { pureHelper } from './helpers';

describe('Plugin helpers', () => {
  describe('#_pureHelper', () => {
    it('should work', () => {
      const value = pureHelper();
      expect(value).toBeUndefined();
    });
  });
});
