import {
  setDetailRowExpanded,
} from './reducers';

describe('TableRowDetail Plugin reducers', () => {
  describe('#setDetailRowExpanded', () => {
    it('can expand row by toggling', () => {
      const expandedRowIds = [];
      const payload = { rowId: 1 };
      const nextExpandedRowIds = setDetailRowExpanded(expandedRowIds, payload);

      expect(nextExpandedRowIds).toEqual([1]);
    });

    it('can collapse row by toggling', () => {
      const expandedRowIds = [1];
      const payload = { rowId: 1 };
      const nextExpandedRowIds = setDetailRowExpanded(expandedRowIds, payload);

      expect(nextExpandedRowIds).toEqual([]);
    });

    it('does not collapse if isExpanded is true', () => {
      const expandedRowIds = [1];
      const payload = { rowId: 1, isExpanded: true };

      let nextExpandedRowIds = setDetailRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([1]);

      nextExpandedRowIds = setDetailRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([1]);
    });

    it('doesn not expand if isExpanded is false', () => {
      const expandedRowIds = [];
      const payload = { rowId: 1, isExpanded: false };

      let nextExpandedRowIds = setDetailRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([]);

      nextExpandedRowIds = setDetailRowExpanded(expandedRowIds, payload);
      expect(nextExpandedRowIds).toEqual([]);
    });
  });
});
