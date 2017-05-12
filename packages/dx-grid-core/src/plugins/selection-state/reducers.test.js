import {
    setRowSelection,
    setRowsSelection,
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

  describe('#setRowsSelection', () => {
    test('can select all', () => {
      const selection = [];
      const payload = { rowIds: [1, 2] };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2]);
    });

    test('should add to selection if there are no selection rows', () => {
      const selection = [1, 2];
      const payload = { rowIds: [3, 4] };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2, 3, 4]);
    });

    test('should add to selection if there are some selection rows', () => {
      const selection = [1, 2, 3];
      const payload = { rowIds: [3, 4] };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2, 3, 4]);
    });

    test('should remove from selection all rows is selected', () => {
      const selection = [1, 2, 3, 4];
      const payload = { rowIds: [3, 4] };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2]);
    });

    test('should add to selection if isSelected is true', () => {
      const selection = [1, 2, 3, 4];
      const payload = { rowIds: [3, 4], isSelected: true };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2, 3, 4]);
    });

    test('should remove from selection if isSelected is false', () => {
      const selection = [1, 2, 3];
      const payload = { rowIds: [3, 4], isSelected: false };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2]);
    });
  });
});
