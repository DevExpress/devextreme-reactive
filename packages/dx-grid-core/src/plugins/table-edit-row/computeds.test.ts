import { TABLE_ADDED_TYPE, TABLE_EDIT_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { tableRowsWithEditing } from './computeds';

describe('TableEditRow Plugin computeds', () => {
  describe('#tableRowsWithEditing', () => {
    it('should work', () => {
      const tableRows = [
        { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
        {
          key: `${TABLE_DATA_TYPE.toString()}_2`,
          type: TABLE_DATA_TYPE,
          rowId: 2,
          row: 'row2',
        },
        { type: 'undefined', rowId: 2, row: 'row2' },
      ];
      const editingRowIds = [2];
      const addedRows = [{ id: 3 }, { id: 4 }];

      expect(tableRowsWithEditing(tableRows, editingRowIds, addedRows, 100))
        .toEqual([
          {
            key: `${TABLE_ADDED_TYPE.toString()}_1`,
            type: TABLE_ADDED_TYPE,
            rowId: 1,
            row: { id: 4 },
            height: 100,
          },
          {
            key: `${TABLE_ADDED_TYPE.toString()}_0`,
            type: TABLE_ADDED_TYPE,
            rowId: 0,
            row: { id: 3 },
            height: 100,
          },
          { type: TABLE_DATA_TYPE, rowId: 1, row: 'row1' },
          {
            key: `${TABLE_DATA_TYPE.toString()}_2`,
            type: TABLE_EDIT_TYPE,
            rowId: 2,
            row: 'row2',
            height: 100,
          },
          { type: 'undefined', rowId: 2, row: 'row2' },
        ]);
    });
  });
});
