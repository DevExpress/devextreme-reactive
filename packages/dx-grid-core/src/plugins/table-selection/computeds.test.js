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
    const setRowSelectionMock = jest.fn();
    const setRowSelectionCalls = setRowSelectionMock.mock.calls;
    const existingExtraProps = { a: 1 };

    it('should work', () => {
      const extraProps = tableExtraPropsWithSelection(
        existingExtraProps,
        setRowSelectionMock,
      );
      const extraPropsKeys = Object.keys(extraProps);

      extraProps.onClick({ tableRow: { type: TABLE_DATA_TYPE, rowId: 0, row: { field: 'a' } } });
      extraProps.onClick({ tableRow: { type: TABLE_DATA_TYPE, rowId: 2, row: { field: 'c' } } });
      extraProps.onClick({ tableRow: { type: 'undefined', rowId: 3, row: { field: 'c' } } });

      expect(extraPropsKeys).toHaveLength(2);
      expect(extraPropsKeys[0]).toBe('a');
      expect(extraProps[extraPropsKeys[0]]).toBe(1);

      expect(setRowSelectionCalls).toHaveLength(2);
      expect(setRowSelectionCalls[0][0]).toMatchObject({ rowId: 0 });
      expect(setRowSelectionCalls[1][0]).toMatchObject({ rowId: 2 });
    });
  });
});
