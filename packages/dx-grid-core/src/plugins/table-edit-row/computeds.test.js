import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from './constants';
import {
  tableRowsWithEditing,
} from './computeds';

describe('TableEditRow Plugin computeds', () => {
  describe('#tableRowsWithEditing', () => {
    it('should work', () => {
      const rows = [{ original: { id: 1 } }, { original: { id: 2 } }];
      const editingRows = [2];
      const addedRows = [{ id: 3 }];

      expect(tableRowsWithEditing(rows, editingRows, addedRows, row => row.id))
        .toEqual([
          {
            type: TABLE_ADDING_TYPE,
            id: 0,
            original: { id: 3 },
          },
          { original: { id: 1 } },
          {
            type: TABLE_EDITING_TYPE,
            original: { id: 2 },
          },
        ]);
    });
  });
});
