import {
    startEditRows,
    stopEditRows,
    addNewRow,
    changeNewRow,
    cancelNewRows,
    changeRow,
    cancelChanges,
    deleteRows,
    cancelDeletedRows,
} from './reducers';

describe('EditingState reducers', () => {
  describe('#startEditRows', () => {
    test('should work', () => {
      const editingRows = [1];
      const payload = { rowIds: [2, 3] };

      const nextEditingRows = startEditRows(editingRows, payload);
      expect(nextEditingRows).toEqual([1, 2, 3]);
    });
  });
  describe('#stopEditRows', () => {
    test('should work', () => {
      const editingRows = [1, 2, 3];
      const payload = { rowIds: [2] };

      const nextEditingRows = stopEditRows(editingRows, payload);
      expect(nextEditingRows).toEqual([1, 3]);
    });
  });
  describe('#addNewRow', () => {
    test('should work', () => {
      const newRows = [{ a: 1 }];
      const payload = { row: { a: 2 } };

      const nextNewRows = addNewRow(newRows, payload);
      expect(nextNewRows).toEqual([{ a: 2 }, { a: 1 }]);
    });
  });
  describe('#changeNewRow', () => {
    test('should work', () => {
      const newRows = [{ a: 1 }, { a: 2 }];
      const payload = { rowId: 0, change: { a: 3 } };

      const nextNewRows = changeNewRow(newRows, payload);
      expect(nextNewRows).toEqual([{ a: 3 }, { a: 2 }]);
    });
  });
  describe('#cancelNewRows', () => {
    test('should work', () => {
      const newRows = [{ a: 1 }, { a: 2 }];
      const payload = { rowIds: [0] };

      const nextNewRows = cancelNewRows(newRows, payload);
      expect(nextNewRows).toEqual([{ a: 2 }]);
    });
  });
  describe('#changeRow', () => {
    test('first change should work', () => {
      const changedRows = {
        o1: { a: 1 },
      };
      const payload = { rowId: 'o2', change: { a: 2 } };

      const nextChangedRows = changeRow(changedRows, payload);
      expect(nextChangedRows).toEqual({
        o1: { a: 1 },
        o2: { a: 2 },
      });
    });
    test('second change should work', () => {
      const changedRows = {
        o1: { a: 1 },
      };
      const payload = { rowId: 'o1', change: { a: 2 } };

      const nextChangedRows = changeRow(changedRows, payload);
      expect(nextChangedRows).toEqual({
        o1: { a: 2 },
      });
    });
  });
  describe('#cancelChanges', () => {
    test('should work', () => {
      const changedRows = {
        o1: { a: 1 },
        o2: { a: 2 },
      };
      const payload = { rowIds: ['o2'] };

      const nextChangedRows = cancelChanges(changedRows, payload);
      expect(nextChangedRows).toEqual({
        o1: { a: 1 },
      });
    });
  });
  describe('#deleteRows', () => {
    test('should work', () => {
      const deletedRows = [1];
      const payload = { rowIds: [2] };

      const nextDeletedRows = deleteRows(deletedRows, payload);
      expect(nextDeletedRows).toEqual([1, 2]);
    });
  });
  describe('#cancelDeletedRows', () => {
    test('should work', () => {
      const deletedRows = [1, 2];
      const payload = { rowIds: [2] };

      const nextDeletedRows = cancelDeletedRows(deletedRows, payload);
      expect(nextDeletedRows).toEqual([1]);
    });
  });
});
