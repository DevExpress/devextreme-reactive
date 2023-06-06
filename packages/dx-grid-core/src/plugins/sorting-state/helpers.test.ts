import {
  getColumnSortingDirection,
  getPersistentSortedColumns,
  calculateKeepOther,
} from './helpers';
import { Sorting } from '../../types';

describe('SortingState helpers', () => {
  // tslint:disable-next-line:no-object-literal-type-assertion
  const defaultDirection = { direction: 'asc' } as { direction: 'asc' };

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
        { columnName: 'a', ...defaultDirection },
        { columnName: 'b', ...defaultDirection },
      ];
      const columnExtensions = [
        { columnName: 'b', sortingEnabled: false },
        { columnName: 'c', sortingEnabled: false },
      ];
      const result = getPersistentSortedColumns(sorting, columnExtensions);
      expect(result).toEqual(['b']);
    });
    it('should honor the default sortingEnabled state', () => {
      const sorting = [
        { columnName: 'a', ...defaultDirection },
        { columnName: 'b', ...defaultDirection },
        { columnName: 'c', ...defaultDirection },
      ];
      const columnExtensions = [
        { columnName: 'a', sortingEnabled: true },
        { columnName: 'b', sortingEnabled: false },
        { columnName: 'c' },
      ];
      const result = getPersistentSortedColumns(sorting, columnExtensions);
      expect(result).toEqual(['b']);
    });
  });

  describe('#calculateKeepOther', () => {
    it('should not affect keepOther if persistent sorted columns is empty', () => {
      const initialKeepOther = ['a'];
      const keepOther = calculateKeepOther([], initialKeepOther, []);
      expect(keepOther).toBe(initialKeepOther);
    });

    it('should return persistent sorted columns if keepOther is false', () => {
      const persistentSortedColumns = ['a'];
      const keepOther = calculateKeepOther([], false, persistentSortedColumns);
      expect(keepOther).toBe(persistentSortedColumns);
    });

    it('should merge keepOther and persistent sorted columns if keepOther is array', () => {
      const keepOther = calculateKeepOther([], ['a', 'b'], ['b', 'c']);
      expect(keepOther).toEqual(['a', 'b', 'c']);
    });

    it('should merge sorting and persistent sorted columns if keepOther is true', () => {
      const sorting: ReadonlyArray<Sorting> = [
        { columnName: 'a', ...defaultDirection },
        { columnName: 'b', ...defaultDirection },
      ];
      const keepOther = calculateKeepOther(sorting, true, ['b', 'c']);
      expect(keepOther).toEqual(['a', 'b', 'c']);
    });
  });
});
