import {
  toggleDetailRowExpanded,
} from './reducers';

describe('TableRowDetail Plugin reducers', () => {
  describe('#toggleDetailRowExpanded', () => {
    it('can expand row by toggling', () => {
      const expandedRowIds = [];
      const payload = { rowId: 1 };
      const nextExpandedRowIds = toggleDetailRowExpanded(expandedRowIds, payload);

      expect(nextExpandedRowIds).toEqual([1]);
    });

    it('can collapse row by toggling', () => {
      const expandedRowIds = [1];
      const payload = { rowId: 1 };
      const nextExpandedRowIds = toggleDetailRowExpanded(expandedRowIds, payload);

      expect(nextExpandedRowIds).toEqual([]);
    });

    it('does not collapse if state is true', () => {
      const expandedRowIds = [1];
      const payload = { rowId: 1, state: true };

      let nextExpandedRowIds = toggleDetailRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([1]);

      nextExpandedRowIds = toggleDetailRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([1]);
    });

    it('doesn not expand if state is false', () => {
      const expandedRowIds = [];
      const payload = { rowId: 1, state: false };

      let nextExpandedRowIds = toggleDetailRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([]);

      nextExpandedRowIds = toggleDetailRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([]);
    });
  });
});
