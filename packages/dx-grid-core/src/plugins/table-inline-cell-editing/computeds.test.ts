import { TABLE_DATA_TYPE } from '../table/constants';
import { rowsWithEditingCells, columnsWithEditingCells } from './computeds';

describe('TableInlineCellEditing Plugin computeds', () => {
  const editingCells = [{ rowId: 0, columnName: 'b' }];

  describe('#rowsWithEditingCells', () => {
    it('should work with rows which type is TABLE_DATA_TYPE', () => {
      const rows = [
        { rowId: 0, type: TABLE_DATA_TYPE },
        { rowId: 1, type: TABLE_DATA_TYPE },
      ];

      expect(rowsWithEditingCells(rows, []))
        .toEqual(rows);
      expect(rowsWithEditingCells(rows, editingCells))
        .toEqual([
          { rowId: 0, type: TABLE_DATA_TYPE, hasEditCell: true },
          { rowId: 1, type: TABLE_DATA_TYPE },
        ]);
    });

    it('should ignore rows which type is not TABLE_DATA_TYPE', () => {
      const rows = [
        { rowId: 0 },
        { rowId: 1 },
      ];

      expect(rowsWithEditingCells(rows, []))
        .toEqual(rows);
      expect(rowsWithEditingCells(rows, editingCells))
        .toEqual(rows);
    });
  });

  describe('#columnsWithEditingCells', () => {
    it('should work', () => {
      const columns = [
        { column: { name: 'a' } },
        { column: { name: 'b' } },
      ];

      expect(columnsWithEditingCells(columns, []))
        .toEqual(columns);
      expect(columnsWithEditingCells(columns, editingCells))
        .toEqual([
          { column: { name: 'a' } },
          { column: { name: 'b' }, hasEditCell: true },
        ]);
    });
  });
});
