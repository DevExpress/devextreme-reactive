import {
  getColumnSortingDirection,
  getPersistentSortedColumns,
  culculateKeepOther,
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

  describe('#getPersistentSortedColumns', () => {
    it('should calculate persistent sorted columns', () => {
      const sorting = [
        { columnName: 'a' },
        { columnName: 'b' },
      ];
      const columnExtensions = [
        { columnName: 'b', sortingEnabled: false },
        { columnName: 'c', sortingEnabled: false },
      ];
      const result = getPersistentSortedColumns(sorting, columnExtensions);
      expect(result).toEqual(['b']);
    });
  });

  describe('#culculateKeepOther', () => {
    it('should not affect keepOther if persistent sorted columns is empty', () => {
      const initialKeepOther = ['a'];
      const keepOther = culculateKeepOther([], initialKeepOther, []);
      expect(keepOther).toBe(initialKeepOther);
    });

    it('should return persistent sorted columns if keepOther is false', () => {
      const persistentSortedColumns = ['a'];
      const keepOther = culculateKeepOther([], false, persistentSortedColumns);
      expect(keepOther).toBe(persistentSortedColumns);
    });

    it('should merge keepOther and persistent sorted columns if keepOther is array', () => {
      const keepOther = culculateKeepOther([], ['a', 'b'], ['b', 'c']);
      expect(keepOther).toEqual(['a', 'b', 'c']);
    });

    it('should merge sorting and persistent sorted columns if keepOther is true', () => {
      const sorting = [{ columnName: 'a' }, { columnName: 'b' }];
      const keepOther = culculateKeepOther(sorting, true, ['b', 'c']);
      expect(keepOther).toEqual(['a', 'b', 'c']);
    });
  });
});
