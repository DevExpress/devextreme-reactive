import {
  setRowsSelection,
} from './reducers';

describe('SelectionState reducers', () => {
  describe('#setRowsSelection', () => {
    it('can select all', () => {
      const selection = [];
      const payload = { rowIds: [1, 2] };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2]);
    });

    it('should add to selection if there are no selection rows', () => {
      const selection = [1, 2];
      const payload = { rowIds: [3, 4] };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2, 3, 4]);
    });

    it('should add to selection if there are some selection rows', () => {
      const selection = [1, 2, 3];
      const payload = { rowIds: [3, 4] };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2, 3, 4]);
    });

    it('should remove from selection all rows is selected', () => {
      const selection = [1, 2, 3, 4];
      const payload = { rowIds: [3, 4] };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2]);
    });

    it('should add to selection if selected is true', () => {
      const selection = [1, 2, 3, 4];
      const payload = { rowIds: [3, 4], selected: true };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2, 3, 4]);
    });

    it('should remove from selection if selected is false', () => {
      const selection = [1, 2, 3];
      const payload = { rowIds: [3, 4], selected: false };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2]);
    });

    it('can select a single row by toggling', () => {
      const selection = [];
      const payload = { rowIds: [1] };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1]);
    });

    it('can deselect a single row by toggling', () => {
      const selection = [1];
      const payload = { rowIds: [1] };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([]);
    });

    it('does not deselect a single row if selected is true', () => {
      const selection = [1];
      const payload = { rowIds: [1], selected: true };

      let nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1]);

      nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1]);
    });

    it('does not select a single row if selected is false', () => {
      const selection = [];
      const payload = { rowIds: [1], selected: false };

      let nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([]);

      nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([]);
    });
  });
});
