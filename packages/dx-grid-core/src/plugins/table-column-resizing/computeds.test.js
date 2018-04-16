import { TABLE_DATA_TYPE } from '../table/constants';
import {
  tableColumnsWithWidths,
  tableColumnsWithDraftWidths,
} from './computeds';

describe('TableColumnResizing Plugin computeds', () => {
  describe('#tableColumnsWithWidths', () => {
    it('should work', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      ];

      expect(tableColumnsWithWidths(
        tableColumns,
        [
          { columnName: 'a', width: 10 },
          { columnName: 'b', width: 20 },
          { columnName: 'c', width: 15 },
        ],
      ))
        .toEqual([
          { type: TABLE_DATA_TYPE, width: 10, column: { name: 'a' } },
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

      expect(() => tableColumnsWithWidths(
        tableColumns,
        [{ columnName: 'a', width: 10 }],
        [{ columnName: 'a', width: 15 }],
      ))
        .toThrow(/"b".*width/);
    });
  });

  describe('#tableColumnsWithDraftWidths', () => {
    it('should work', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      ];

      expect(tableColumnsWithDraftWidths(
        tableColumns,
        [{ columnName: 'a', width: 15 }],
      ))
        .toEqual([
          { type: TABLE_DATA_TYPE, width: 15, column: { name: 'a' } },
          { type: TABLE_DATA_TYPE, column: { name: 'b' } },
          { type: TABLE_DATA_TYPE, column: { name: 'c' } },
        ]);
    });
  });
});
