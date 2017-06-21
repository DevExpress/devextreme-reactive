import {
    getAvailableToSelect,
    getAvailableSelection,
} from './computeds';

describe('PagingState computeds', () => {
  describe('#getAvailableToSelect', () => {
    it('should work', () => {
      const rows = [{ id: 1 }, { id: 2, type: 'group' }, { id: 3 }];

      expect(getAvailableToSelect(rows, row => row.id)).toEqual([1, 3]);
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
