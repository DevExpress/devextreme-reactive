import {
  toggleDetailRowExpanded,
} from './reducers';

describe('TableRowDetail Plugin reducers', () => {
  describe('#toggleDetailRowExpanded', () => {
    it('can expand row by toggling', () => {
      const expandedDetailRowIds = [];
      const payload = { rowId: 1 };
      const nextExpandedRowIds = toggleDetailRowExpanded(expandedDetailRowIds, payload);

      expect(nextExpandedRowIds).toEqual([1]);
    });

    it('can collapse row by toggling', () => {
      const expandedDetailRowIds = [1];
      const payload = { rowId: 1 };
      const nextExpandedRowIds = toggleDetailRowExpanded(expandedDetailRowIds, payload);

      expect(nextExpandedRowIds).toEqual([]);
    });

    it('does not collapse if state is true', () => {
      const expandedDetailRowIds = [1];
      const payload = { rowId: 1, state: true };

      let nextExpandedRowIds = toggleDetailRowExpanded(expandedDetailRowIds, payload);
      expect(nextExpandedRowIds).toEqual([1]);

      nextExpandedRowIds = toggleDetailRowExpanded(expandedDetailRowIds, payload);
      expect(nextExpandedRowIds).toEqual([1]);
    });

    it('doesn not expand if state is false', () => {
      const expandedDetailRowIds = [];
      const payload = { rowId: 1, state: false };

      let nextExpandedRowIds = toggleDetailRowExpanded(expandedDetailRowIds, payload);
      expect(nextExpandedRowIds).toEqual([]);

      nextExpandedRowIds = toggleDetailRowExpanded(expandedDetailRowIds, payload);
      expect(nextExpandedRowIds).toEqual([]);
    });
  });
});
