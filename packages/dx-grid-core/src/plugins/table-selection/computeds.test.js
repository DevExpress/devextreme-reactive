import {
    tableColumnsWithSelection,
    tableBodyRowsWithSelection,
    tableExtraProps,
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
      expect(columns[0]).toMatchObject({ type: 'select', name: 'select', width: 123 });
      expect(columns[1]).toBe(tableColumns[0]);
      expect(columns[2]).toBe(tableColumns[1]);
    });
  });

  describe('#tableBodyRowsWithSelection', () => {
    const bodyRows = [
      { field: 'a' },
      { field: 'b' },
      { field: 'c' },
    ];
    const selection = [0, 2];
    const getRowId = row => bodyRows.findIndex(item => item.field === row.field);

    it('should work', () => {
      const selectedRows = tableBodyRowsWithSelection(bodyRows, selection, getRowId);

      expect(selectedRows).toHaveLength(3);
      expect(selectedRows[0]).toMatchObject({ selected: true, _originalRow: bodyRows[0], field: 'a' });
      expect(selectedRows[1]).toBe(bodyRows[1]);
      expect(selectedRows[2]).toMatchObject({ selected: true, _originalRow: bodyRows[2], field: 'c' });
    });
  });

  describe('#tableExtraProps', () => {
    const rows = [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
    ];

    const getRowId = row => rows.findIndex(item => row.name === item.name);
    const setRowsSelectionMock = jest.fn();
    const setRowsSelectionCalls = setRowsSelectionMock.mock.calls;
    const existingExtraProps = { a: 1 };
    const availableToSelect = [0, 2];

    it('should work', () => {
      const extraProps = tableExtraProps(
        existingExtraProps,
        availableToSelect,
        setRowsSelectionMock,
        getRowId,
      );
      const extraPropsKeys = Object.keys(extraProps);

      extraProps.onClick({ row: { name: 'a' } });
      extraProps.onClick({ row: { name: 'b' } });
      extraProps.onClick({ row: { name: 'c' } });

      expect(extraPropsKeys).toHaveLength(2);
      expect(extraPropsKeys[0]).toBe('a');
      expect(extraProps[extraPropsKeys[0]]).toBe(1);

      expect(setRowsSelectionCalls).toHaveLength(2);
      expect(setRowsSelectionCalls[0][0]).toMatchObject({ rowIds: [0] });
      expect(setRowsSelectionCalls[1][0]).toMatchObject({ rowIds: [2] });
    });
  });
});
