import {
  getAvailableSelection,
} from './computeds';

describe('SelectionState computeds', () => {
  describe('#getAvailableSelection', () => {
    it('should work', () => {
      const selection = [1, 2, 3];
      const availableToSelect = [2, 3, 4];

      expect(getAvailableSelection(selection, availableToSelect)).toEqual([2, 3]);
    });
  });
});
