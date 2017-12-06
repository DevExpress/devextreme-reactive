import {
  setDetailRowExpanded,
} from './reducers';

describe('TableRowDetail Plugin reducers', () => {
  describe('#setDetailRowExpanded', () => {
    it('can expand row by toggling', () => {
      const expandedRows = [];
      const payload = { rowId: 1 };
      const nextExpandedRows = setDetailRowExpanded(expandedRows, payload);

      expect(nextExpandedRows).toEqual([1]);
    });

    it('can collapse row by toggling', () => {
      const expandedRows = [1];
      const payload = { rowId: 1 };
      const nextExpandedRows = setDetailRowExpanded(expandedRows, payload);

      expect(nextExpandedRows).toEqual([]);
    });

    it('does not collapse if isExpanded is true', () => {
      const expandedRows = [1];
      const payload = { rowId: 1, isExpanded: true };

      let nextExpandedRows = setDetailRowExpanded(expandedRows, payload);
      expect(nextExpandedRows).toEqual([1]);

      nextExpandedRows = setDetailRowExpanded(expandedRows, payload);
      expect(nextExpandedRows).toEqual([1]);
    });

    it('doesn not expand if isExpanded is false', () => {
      const expandedRows = [];
      const payload = { rowId: 1, isExpanded: false };

      let nextExpandedRows = setDetailRowExpanded(expandedRows, payload);
      expect(nextExpandedRows).toEqual([]);

      nextExpandedRows = setDetailRowExpanded(expandedRows, payload);
      expect(nextExpandedRows).toEqual([]);
    });
  });
});
