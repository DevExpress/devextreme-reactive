import {
  startEditRows,
  stopEditRows,
  addRow,
  changeAddedRow,
  cancelAddedRows,
  changeRow,
  cancelChanges,
  deleteRows,
  cancelDeletedRows,
} from './reducers';

describe('EditingState reducers', () => {
  describe('#startEditRows', () => {
    it('should work', () => {
      const editingRowIds = [1];
      const payload = { rowIds: [2, 3] };

      const nextEditingRowIds = startEditRows(editingRowIds, payload);
      expect(nextEditingRowIds).toEqual([1, 2, 3]);
    });
  });
  describe('#stopEditRows', () => {
    it('should work', () => {
      const editingRowIds = [1, 2, 3];
      const payload = { rowIds: [2] };

      const nextEditingRowIds = stopEditRows(editingRowIds, payload);
      expect(nextEditingRowIds).toEqual([1, 3]);
    });
  });
  describe('#addRow', () => {
    it('should work', () => {
      const addedRows = [{ a: 1 }];
      const payload = { row: { a: 2 } };

      const nextAddedRows = addRow(addedRows, payload);
      expect(nextAddedRows).toEqual([{ a: 1 }, { a: 2 }]);
    });
  });
  describe('#changeAddedRow', () => {
    it('should work', () => {
      const addedRows = [{ a: 1 }, { a: 2 }];
      const payload = { rowId: 0, change: { a: 3 } };

      const nextAddedRows = changeAddedRow(addedRows, payload);
      expect(nextAddedRows).toEqual([{ a: 3 }, { a: 2 }]);
    });
  });
  describe('#cancelAddedRows', () => {
    it('should work', () => {
      const addedRows = [{ a: 1 }, { a: 2 }];
      const payload = { rowIds: [0] };

      const nextAddedRows = cancelAddedRows(addedRows, payload);
      expect(nextAddedRows).toEqual([{ a: 2 }]);
    });
  });
  describe('#changeRow', () => {
    it('should work on the first change', () => {
      const rowChanges = {
        o1: { a: 1 },
      };
      const payload = { rowId: 'o2', change: { a: 2 } };

      const nextRowChanges = changeRow(rowChanges, payload);
      expect(nextRowChanges).toEqual({
        o1: { a: 1 },
        o2: { a: 2 },
      });
    });
    it('should work on the second change', () => {
      const rowChanges = {
        o1: { a: 1 },
      };
      const payload = { rowId: 'o1', change: { a: 2 } };

      const nextRowChanges = changeRow(rowChanges, payload);
      expect(nextRowChanges).toEqual({
        o1: { a: 2 },
      });
    });
  });
  describe('#cancelChanges', () => {
    it('should work', () => {
      const rowChanges = {
        o1: { a: 1 },
        o2: { a: 2 },
      };
      const payload = { rowIds: ['o2'] };

      const nextRowChanges = cancelChanges(rowChanges, payload);
      expect(nextRowChanges).toEqual({
        o1: { a: 1 },
      });
    });
  });
  describe('#deleteRows', () => {
    it('should work', () => {
      const deletedRowIds = [1];
      const payload = { rowIds: [2] };

      const nextDeletedRowIds = deleteRows(deletedRowIds, payload);
      expect(nextDeletedRowIds).toEqual([1, 2]);
    });
  });
  describe('#cancelDeletedRows', () => {
    it('should work', () => {
      const deletedRowIds = [1, 2];
      const payload = { rowIds: [2] };

      const nextDeletedRowIds = cancelDeletedRows(deletedRowIds, payload);
      expect(nextDeletedRowIds).toEqual([1]);
    });
  });
});
