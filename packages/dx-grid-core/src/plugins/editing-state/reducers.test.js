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
      const editingRows = [1];
      const payload = { rowIds: [2, 3] };

      const nextEditingRows = startEditRows(editingRows, payload);
      expect(nextEditingRows).toEqual([1, 2, 3]);
    });
  });
  describe('#stopEditRows', () => {
    it('should work', () => {
      const editingRows = [1, 2, 3];
      const payload = { rowIds: [2] };

      const nextEditingRows = stopEditRows(editingRows, payload);
      expect(nextEditingRows).toEqual([1, 3]);
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
    it('should work on the second change', () => {
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
    it('should work', () => {
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
    it('should work', () => {
      const deletedRows = [1];
      const payload = { rowIds: [2] };

      const nextDeletedRows = deleteRows(deletedRows, payload);
      expect(nextDeletedRows).toEqual([1, 2]);
    });
  });
  describe('#cancelDeletedRows', () => {
    it('should work', () => {
      const deletedRows = [1, 2];
      const payload = { rowIds: [2] };

      const nextDeletedRows = cancelDeletedRows(deletedRows, payload);
      expect(nextDeletedRows).toEqual([1]);
    });
  });
});
