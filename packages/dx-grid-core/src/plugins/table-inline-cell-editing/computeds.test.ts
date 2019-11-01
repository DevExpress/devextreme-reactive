import { rowsWithEditingCells, columnsWithEditingCells } from './computeds';

describe('TableInlineCellEditing Plugin computeds', () => {
  const editingCells = [{ rowId: 0, columnName: 'b' }];

  describe('#rowsWithEditingCells', () => {
    it('should work', () => {
      const rows = [
        { rowId: 0 },
        { rowId: 1 },
      ];

      expect(rowsWithEditingCells(rows, []))
        .toEqual(rows);
      expect(rowsWithEditingCells(rows, editingCells))
        .toEqual([
          { rowId: 0, hasEditCell: true },
          { rowId: 1 },
        ]);
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
