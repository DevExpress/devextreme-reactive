import { getRowChange } from './helpers';

describe('EditingState helpers', () => {
  describe('#getRowChange', () => {
    it('should work', () => {
      const changed = {
        o1: { a: 1 },
        o2: { b: 1 },
      };
      const rowId = 'o2';

      const value = getRowChange(changed, rowId);
      expect(value).toEqual({ b: 1 });
    });
  });
});
