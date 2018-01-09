import {
  toggleDetailRowExpanded,
} from './reducers';

describe('TableRowDetail Plugin reducers', () => {
  describe('#toggleDetailRowExpanded', () => {
    it('can expand row by toggling', () => {
      const expandedRows = [];
      const payload = { rowId: 1 };
      const nextExpandedRows = toggleDetailRowExpanded(expandedRows, payload);

      expect(nextExpandedRows).toEqual([1]);
    });

    it('can collapse row by toggling', () => {
      const expandedRows = [1];
      const payload = { rowId: 1 };
      const nextExpandedRows = toggleDetailRowExpanded(expandedRows, payload);

      expect(nextExpandedRows).toEqual([]);
    });

    it('does not collapse if state is true', () => {
      const expandedRows = [1];
      const payload = { rowId: 1, state: true };

      let nextExpandedRows = toggleDetailRowExpanded(expandedRows, payload);
      expect(nextExpandedRows).toEqual([1]);

      nextExpandedRows = toggleDetailRowExpanded(expandedRows, payload);
      expect(nextExpandedRows).toEqual([1]);
    });

    it('doesn not expand if state is false', () => {
      const expandedRows = [];
      const payload = { rowId: 1, state: false };

      let nextExpandedRows = toggleDetailRowExpanded(expandedRows, payload);
      expect(nextExpandedRows).toEqual([]);

      nextExpandedRows = toggleDetailRowExpanded(expandedRows, payload);
      expect(nextExpandedRows).toEqual([]);
    });
  });
});
