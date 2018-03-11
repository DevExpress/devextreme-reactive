import { toggleRowExpanded } from './reducers';

describe('TableRowDetail Plugin reducers', () => {
  describe('#toggleRowExpanded', () => {
    it('can expand row by toggling', () => {
      const expandedRowIds = [];
      const payload = { rowId: 1 };
      const nextExpandedRowIds = toggleRowExpanded(expandedRowIds, payload);

      expect(nextExpandedRowIds).toEqual([1]);
    });

    it('can collapse row by toggling', () => {
      const expandedRowIds = [1];
      const payload = { rowId: 1 };
      const nextExpandedRowIds = toggleRowExpanded(expandedRowIds, payload);

      expect(nextExpandedRowIds).toEqual([]);
    });

    it('does not collapse if state is true', () => {
      const expandedRowIds = [1];
      const payload = { rowId: 1, state: true };

      let nextExpandedRowIds = toggleRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([1]);

      nextExpandedRowIds = toggleRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([1]);
    });

    it('doesn not expand if state is false', () => {
      const expandedRowIds = [];
      const payload = { rowId: 1, state: false };

      let nextExpandedRowIds = toggleRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([]);

      nextExpandedRowIds = toggleRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([]);
    });
  });
});
