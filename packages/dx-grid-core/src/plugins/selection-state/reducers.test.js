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

    it('should add to selection if isSelected is true', () => {
      const selection = [1, 2, 3, 4];
      const payload = { rowIds: [3, 4], isSelected: true };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2, 3, 4]);
    });

    it('should remove from selection if isSelected is false', () => {
      const selection = [1, 2, 3];
      const payload = { rowIds: [3, 4], isSelected: false };

      const nextSelection = setRowsSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2]);
    });
  });
});
