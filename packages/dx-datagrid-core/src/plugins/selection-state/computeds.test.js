import {
    getAvaliableToSelect,
    getAvaliableSelection,
} from './computeds';

describe('PagingState computeds', () => {
  describe('#getAvaliableToSelect', () => {
    test('should work', () => {
      const rows = [{ id: 1 }, { id: 2, type: 'group' }, { id: 3 }];

      expect(getAvaliableToSelect(rows)).toEqual([1, 3]);
    });
  });
  describe('#getAvaliableSelection', () => {
    test('should work', () => {
      const selection = [1, 2, 3];
      const avaliableToSelect = [2, 3, 4];

      expect(getAvaliableSelection(selection, avaliableToSelect)).toEqual([2, 3]);
    });
  });
});
