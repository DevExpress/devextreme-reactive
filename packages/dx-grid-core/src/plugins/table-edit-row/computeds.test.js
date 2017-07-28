import { TABLE_ADDING_TYPE, TABLE_EDITING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';
import {
  tableRowsWithEditing,
} from './computeds';

describe('TableEditRow Plugin computeds', () => {
  describe('#tableRowsWithEditing', () => {
    it('should work', () => {
      const tableRows = [
        { type: TABLE_DATA_TYPE, id: 1, row: 'row1' },
        { type: TABLE_DATA_TYPE, id: 2, row: 'row2' },
        { type: 'undefined', id: 2, row: 'row2' },
      ];
      const editingRows = [2];
      const addedRows = [{ id: 3 }];

      expect(tableRowsWithEditing(tableRows, editingRows, addedRows, 100))
        .toEqual([
          {
            type: TABLE_ADDING_TYPE,
            id: 0,
            row: { id: 3 },
            height: 100,
          },
          { type: TABLE_DATA_TYPE, id: 1, row: 'row1' },
          {
            type: TABLE_EDITING_TYPE,
            id: 2,
            row: 'row2',
            height: 100,
          },
          { type: 'undefined', id: 2, row: 'row2' },
        ]);
    });
  });
});
