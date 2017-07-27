import { TABLE_SELECT_TYPE } from './constants';
import {
  tableColumnsWithSelection,
  tableRowsWithSelection,
  tableExtraPropsWithSelection,
} from './computeds';

describe('TableSelection Plugin computeds', () => {
  describe('#tableColumnsWithSelection', () => {
    const tableColumns = [
      { name: 'a' },
      { name: 'b' },
    ];

    it('should work', () => {
      const columns = tableColumnsWithSelection(tableColumns, 123);

      expect(columns).toHaveLength(3);
      expect(columns[0]).toMatchObject({ type: TABLE_SELECT_TYPE, id: 0, width: 123 });
      expect(columns[1]).toBe(tableColumns[0]);
      expect(columns[2]).toBe(tableColumns[1]);
    });
  });

  describe('#tableRowsWithSelection', () => {
    const bodyRows = [
      { row: { field: 'a' } },
      { row: { field: 'b' } },
      { row: { field: 'c' } },
    ];
    const selection = [0, 2];
    const getRowId = row => bodyRows.findIndex(item => item.row.field === row.field);

    it('should work', () => {
      const selectedRows = tableRowsWithSelection(bodyRows, selection, getRowId);

      expect(selectedRows)
        .toEqual([
          { selected: true, row: { field: 'a' } },
          { row: { field: 'b' } },
          { selected: true, row: { field: 'c' } },
        ]);
    });
  });

  describe('#tableExtraPropsWithSelection', () => {
    const rows = [
      { row: { field: 'a' } },
      { row: { field: 'b' } },
      { row: { field: 'c' } },
    ];
    const getRowId = row => rows.findIndex(item => item.row.field === row.field);
    const setRowSelectionMock = jest.fn();
    const setRowSelectionCalls = setRowSelectionMock.mock.calls;
    const existingExtraProps = { a: 1 };

    it('should work', () => {
      const extraProps = tableExtraPropsWithSelection(
        existingExtraProps,
        setRowSelectionMock,
        getRowId,
      );
      const extraPropsKeys = Object.keys(extraProps);

      extraProps.onClick({ tableRow: { row: { field: 'a' } } });
      extraProps.onClick({ tableRow: { row: { field: 'c' } } });

      expect(extraPropsKeys).toHaveLength(2);
      expect(extraPropsKeys[0]).toBe('a');
      expect(extraProps[extraPropsKeys[0]]).toBe(1);

      expect(setRowSelectionCalls).toHaveLength(2);
      expect(setRowSelectionCalls[0][0]).toMatchObject({ rowId: 0 });
      expect(setRowSelectionCalls[1][0]).toMatchObject({ rowId: 2 });
    });
  });
});
