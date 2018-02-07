import {
  getColumnSortingDirection,
  calculatePersistentSorting,
} from './helpers';

describe('SortingState helpers', () => {
  describe('#getColumnSortingDirection', () => {
    it('returns sorting direction', () => {
      const sorting = [{ columnName: 'test', direction: 'testDirection' }];

      const direction = getColumnSortingDirection(sorting, 'test');
      expect(direction).toBe('testDirection');
    });

    it('returns null if a column is not sorted', () => {
      const sorting = [];

      const direction = getColumnSortingDirection(sorting, 'test');
      expect(direction).toBe(null);
    });
  });

  describe('#calculatePersistentSorting', () => {
    it('should calculate persistent sorting', () => {
      const sorting = [
        { columnName: 'a' },
        { columnName: 'b' },
      ];
      const columnExtensions = [
        { columnName: 'b', sortingEnabled: false },
        { columnName: 'c', sortingEnabled: false },
      ];
      const result = calculatePersistentSorting(sorting, columnExtensions);
      expect(result).toEqual(['b']);
    });
  });
});
