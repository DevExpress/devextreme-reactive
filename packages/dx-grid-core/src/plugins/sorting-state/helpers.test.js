import { TABLE_DATA_TYPE } from '../table-view/constants';
import {
  getColumnSortingDirection,
  getHeaderRowScope,
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

  describe('#getHeaderRowScope', () => {
    it('return only data fields', () => {
      const tableColumns = [
        { type: 'detail', column: { name: 'A' } },
        { type: TABLE_DATA_TYPE, column: { name: 'B' } },
        { type: 'select', column: { name: 'C' } },
        { type: TABLE_DATA_TYPE, column: { name: 'D' } },
      ];

      const scope = getHeaderRowScope(tableColumns, TABLE_DATA_TYPE);
      expect(scope).toEqual(['B', 'D']);
    });
  });
});
