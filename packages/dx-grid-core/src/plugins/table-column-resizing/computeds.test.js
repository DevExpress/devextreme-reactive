import { TABLE_DATA_TYPE } from '../table-view/constants';
import {
  tableColumnsWithWidths,
} from './computeds';


describe('TableColumnResizing Plugin computeds', () => {
  describe('#tableColumnsWithWidths', () => {
    it('should work', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      ];

      expect(tableColumnsWithWidths(tableColumns, { a: 10, b: 20, c: 15 }, { a: 15 }))
        .toEqual([
          { type: TABLE_DATA_TYPE, width: 15, column: { name: 'a' } },
          { type: TABLE_DATA_TYPE, width: 20, column: { name: 'b' } },
          { type: TABLE_DATA_TYPE, width: 15, column: { name: 'c' } },
        ]);
    });

    it('should throw error if width for column is not specified', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      ];

      expect(() => tableColumnsWithWidths(tableColumns, { a: 10 }, { a: 15 }))
        .toThrow(/"b".*width/);
    });
  });
});
