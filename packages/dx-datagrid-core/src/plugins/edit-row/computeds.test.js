import {
    rowsWithEditing,
} from './computeds';

describe('EditRow computeds', () => {
  describe('#rowsWithEditing', () => {
    test('should work', () => {
      const rows = [{ id: 1 }, { id: 2 }];
      const editingRows = [2];
      const newRows = [{ id: 3 }];

      const computed = rowsWithEditing(rows, editingRows, newRows, row => row.id);
      expect(computed).toEqual([
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
