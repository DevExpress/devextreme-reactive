import {
    rowsWithEditing,
} from './computeds';

describe('EditRow computeds', () => {
  describe('#rowsWithEditing', () => {
    it('should work', () => {
      const rows = [{ id: 1 }, { id: 2 }];
      const editingRows = [2];
      const addedRows = [{ id: 3 }, { id: 4 }];

      const computed = rowsWithEditing(rows, editingRows, addedRows, row => row.id);
      expect(computed).toEqual([
        {
          index: 1,
          type: 'edit',
          _originalRow: { id: 4 },
          isNew: true,
        },
        {
          index: 0,
          type: 'edit',
          _originalRow: { id: 3 },
          isNew: true,
        },
        { id: 1 },
        {
          type: 'edit',
          _originalRow: { id: 2 },
        },
      ]);
    });
  });
});
