import {
    rowsWithEditing,
} from './computeds';

describe('EditRow computeds', () => {
  describe('#rowsWithEditing', () => {
    test('should work', () => {
      const rows = [{ id: 1 }, { id: 2 }];
      const editingRows = [2];
      const newRows = [{ id: 3 }];

      const computed = rowsWithEditing(rows, editingRows, newRows);
      expect(computed).toEqual([
        {
          id: 0,
          type: 'edit',
          dataRow: { id: 3 },
          isNew: true,
        },
        { id: 1 },
        {
          type: 'edit',
          dataRow: { id: 2 },
        },
      ]);
    });
  });
});
