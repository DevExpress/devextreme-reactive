import { TABLE_SELECT_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';
import {
  tableColumnsWithSelection,
  tableRowsWithSelection,
  tableExtraPropsWithSelection,
} from './computeds';

describe('TableSelection Plugin computeds', () => {
  describe('#tableColumnsWithSelection', () => {
    it('should work', () => {
      expect(tableColumnsWithSelection([{}], 123))
        .toEqual([
          { key: TABLE_SELECT_TYPE, type: TABLE_SELECT_TYPE, width: 123 },
          {},
        ]);
    });
  });

  describe('#tableRowsWithSelection', () => {
    const bodyRows = [
      { type: TABLE_DATA_TYPE, rowId: 0, row: { field: 'a' } },
      { type: TABLE_DATA_TYPE, rowId: 1, row: { field: 'b' } },
      { type: TABLE_DATA_TYPE, rowId: 2, row: { field: 'c' } },
      { type: 'undefined', rowId: 2, row: { field: 'c' } },
    ];
    const selection = [0, 2];

    it('should work', () => {
      const selectedRows = tableRowsWithSelection(bodyRows, selection);

      expect(selectedRows)
        .toEqual([
          { type: TABLE_DATA_TYPE, rowId: 0, row: { field: 'a' }, selected: true },
          { type: TABLE_DATA_TYPE, rowId: 1, row: { field: 'b' } },
          { type: TABLE_DATA_TYPE, rowId: 2, row: { field: 'c' }, selected: true },
          { type: 'undefined', rowId: 2, row: { field: 'c' } },
        ]);
    });
  });

  describe('#tableExtraPropsWithSelection', () => {
    const setRowsSelectionMock = jest.fn();
    const setRowsSelectionCalls = setRowsSelectionMock.mock.calls;
    const existingExtraProps = { a: 1 };

    it('should work', () => {
      const extraProps = tableExtraPropsWithSelection(
        existingExtraProps,
        setRowsSelectionMock,
      );
      const extraPropsKeys = Object.keys(extraProps);

      extraProps.onClick({ tableRow: { type: TABLE_DATA_TYPE, rowId: 0, row: { field: 'a' } } });
      extraProps.onClick({ tableRow: { type: TABLE_DATA_TYPE, rowId: 2, row: { field: 'c' } } });
      extraProps.onClick({ tableRow: { type: 'undefined', rowId: 3, row: { field: 'c' } } });

      expect(extraPropsKeys).toHaveLength(2);
      expect(extraPropsKeys[0]).toBe('a');
      expect(extraProps[extraPropsKeys[0]]).toBe(1);

      expect(setRowsSelectionCalls).toHaveLength(2);
      expect(setRowsSelectionCalls[0][0]).toMatchObject({ rowIds: [0] });
      expect(setRowsSelectionCalls[1][0]).toMatchObject({ rowIds: [2] });
    });
  });
});
