import { toggleSelection } from './reducers';

describe('SelectionState reducers', () => {
  describe('#toggleSelection', () => {
    it('can select all', () => {
      const selection = [];
      const payload = { rowIds: [1, 2] };

      const nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2]);
    });

    it('should add to selection if there are no selection rows', () => {
      const selection = [1, 2];
      const payload = { rowIds: [3, 4] };

      const nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2, 3, 4]);
    });

    it('should add to selection if there are some selection rows', () => {
      const selection = [1, 2, 3];
      const payload = { rowIds: [3, 4] };

      const nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2, 3, 4]);
    });

    it('should remove from selection all rows is selected', () => {
      const selection = [1, 2, 3, 4];
      const payload = { rowIds: [3, 4] };

      const nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2]);
    });

    it('should add to selection if state is true', () => {
      const selection = [1, 2, 3, 4];
      const payload = { rowIds: [3, 4], state: true };

      const nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2, 3, 4]);
    });

    it('should remove from selection if state is false', () => {
      const selection = [1, 2, 3];
      const payload = { rowIds: [3, 4], state: false };

      const nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([1, 2]);
    });

    it('can select a single row by toggling', () => {
      const selection = [];
      const payload = { rowIds: [1] };

      const nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([1]);
    });

    it('can deselect a single row by toggling', () => {
      const selection = [1];
      const payload = { rowIds: [1] };

      const nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([]);
    });

    it('does not deselect a single row if state is true', () => {
      const selection = [1];
      const payload = { rowIds: [1], state: true };

      let nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([1]);

      nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([1]);
    });

    it('does not select a single row if state is false', () => {
      const selection = [];
      const payload = { rowIds: [1], state: false };

      let nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([]);

      nextSelection = toggleSelection(selection, payload);
      expect(nextSelection).toEqual([]);
    });
  });
});
