import { SELECT_TYPE } from './constants';
import {
  tableColumnsWithSelection,
  tableBodyRowsWithSelection,
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
      expect(columns[0]).toMatchObject({ type: SELECT_TYPE, id: 0, width: 123 });
      expect(columns[1]).toBe(tableColumns[0]);
      expect(columns[2]).toBe(tableColumns[1]);
    });
  });

  describe('#tableBodyRowsWithSelection', () => {
    const bodyRows = [
      { original: { field: 'a' } },
      { original: { field: 'b' } },
      { original: { field: 'c' } },
    ];
    const selection = [0, 2];
    const getRowId = row => bodyRows.findIndex(item => item.original.field === row.field);

    it('should work', () => {
      const selectedRows = tableBodyRowsWithSelection(bodyRows, selection, getRowId);

      expect(selectedRows)
        .toEqual([
          { selected: true, original: { field: 'a' } },
          { original: { field: 'b' } },
          { selected: true, original: { field: 'c' } },
        ]);
    });
  });

  describe('#tableExtraPropsWithSelection', () => {
    const rows = [
      { original: { field: 'a' } },
      { original: { field: 'b' } },
      { original: { field: 'c' } },
    ];
    const getRowId = row => rows.findIndex(item => item.original.field === row.field);
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

      extraProps.onClick({ row: { original: { field: 'a' } } });
      extraProps.onClick({ row: { original: { field: 'c' } } });

      expect(extraPropsKeys).toHaveLength(2);
      expect(extraPropsKeys[0]).toBe('a');
      expect(extraProps[extraPropsKeys[0]]).toBe(1);

      expect(setRowSelectionCalls).toHaveLength(2);
      expect(setRowSelectionCalls[0][0]).toMatchObject({ rowId: 0 });
      expect(setRowSelectionCalls[1][0]).toMatchObject({ rowId: 2 });
    });
  });
});
