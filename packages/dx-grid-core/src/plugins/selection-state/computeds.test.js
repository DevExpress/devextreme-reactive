import {
  getAvailableToSelect,
  getAvailableSelection,
} from './computeds';

describe('SelectionState computeds', () => {
  describe('#getAvailableToSelect', () => {
    it('should work', () => {
      const rows = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ];
      const getRowId = row => row.id;

      expect(getAvailableToSelect(rows, getRowId))
        .toEqual([1, 2, 3]);
    });
  });

  describe('#getAvailableSelection', () => {
    it('should work', () => {
      const selection = [1, 2, 3];
      const availableToSelect = [2, 3, 4];

      expect(getAvailableSelection(selection, availableToSelect)).toEqual([2, 3]);
    });
  });
});
