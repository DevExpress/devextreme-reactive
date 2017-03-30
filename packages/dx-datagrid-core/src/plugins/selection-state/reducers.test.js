import {
    setRowSelection,
    toggleSelectAll,
} from './reducers';

describe('SelectionState reducers', () => {
  describe('#setRowSelection', () => {
    test('can select row by toggling', () => {
      const selection = [];
      const payload = { rowId: 1 };

      const nextSelection = setRowSelection(selection, payload);
      expect(nextSelection).toEqual([1]);
    });

    test('can deselect row by toggling', () => {
      const selection = [1];
      const payload = { rowId: 1 };

      const nextSelection = setRowSelection(selection, payload);
      expect(nextSelection).toEqual([]);
    });

    test('does not deselect if isSelected is true', () => {
      const selection = [1];
      const payload = { rowId: 1, isSelected: true };

      let nextSelection = setRowSelection(selection, payload);
      expect(nextSelection).toEqual([1]);

      nextSelection = setRowSelection(selection, payload);
      expect(nextSelection).toEqual([1]);
    });

    test('does not select if isSelected is false', () => {
      const selection = [];
      const payload = { rowId: 1, isSelected: false };

      let nextSelection = setRowSelection(selection, payload);
      expect(nextSelection).toEqual([]);

      nextSelection = setRowSelection(selection, payload);
      expect(nextSelection).toEqual([]);
    });
  });

  describe('#toggleSelectAll', () => {
    test('can select all', () => {
      const selection = [];
      const payload = { rows: [1, 2], getRowId: row => row };

      const nextSelection = toggleSelectAll(selection, payload);
      expect(nextSelection).toEqual([1, 2]);
    });
  });
});
