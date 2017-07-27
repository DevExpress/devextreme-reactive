import { ADD_TYPE, EDIT_TYPE } from './constants';
import {
  tableRowsWithEditing,
} from './computeds';

describe('EditRow computeds', () => {
  describe('#tableRowsWithEditing', () => {
    it('should work', () => {
      const rows = [{ original: { id: 1 } }, { original: { id: 2 } }];
      const editingRows = [2];
      const addedRows = [{ id: 3 }];

      expect(tableRowsWithEditing(rows, editingRows, addedRows, row => row.id))
        .toEqual([
          {
            type: ADD_TYPE,
            id: 0,
            original: { id: 3 },
          },
          { original: { id: 1 } },
          {
            type: EDIT_TYPE,
            original: { id: 2 },
          },
        ]);
    });
  });
});
