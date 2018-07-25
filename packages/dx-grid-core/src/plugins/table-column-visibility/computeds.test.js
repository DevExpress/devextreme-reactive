import { visibleTableColumns } from './computeds';
import { TABLE_DATA_TYPE } from '../table/constants';

describe('TableColumnVisibility computeds', () => {
  describe('#visibleTableColumns', () => {
    it('should return a correct array of visible table columns', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ];
      const hiddenColumnNames = ['a', 'c', 'd'];

      expect(visibleTableColumns(tableColumns, hiddenColumnNames))
        .toEqual([{ type: TABLE_DATA_TYPE, column: { name: 'b' } }]);
    });

    it('should ignore non-data columns', () => {
      const tableColumns = [
        { key: 'editCommand' },
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
      ];
      const hiddenColumnNames = ['a'];

      expect(visibleTableColumns(tableColumns, hiddenColumnNames))
        .toEqual([{ key: 'editCommand' }, { type: TABLE_DATA_TYPE, column: { name: 'b' } }]);
    });
  });
});
