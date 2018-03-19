import {
  changeTableColumnWidth,
  draftTableColumnWidth,
  cancelTableColumnWidthDraft,
} from './reducers';

describe('TableColumnResizing Plugin reducers', () => {
  describe('#changeTableColumnWidth', () => {
    it('should work', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
      };

      expect(changeTableColumnWidth(state, { columnName: 'a', shift: 5, minColumnWidth: 40 }))
        .toEqual({
          columnWidths: [{ columnName: 'a', width: 45 }, { columnName: 'b', width: 60 }],
        });
    });

    it('should stick size to the min', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
      };

      expect(changeTableColumnWidth(state, { columnName: 'b', shift: -25, minColumnWidth: 40 }))
        .toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 40 }],
        });
    });
  });

  describe('#draftTableColumnWidth', () => {
    it('should work', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
        draftColumnWidths: [],
      };

      expect(draftTableColumnWidth(state, { columnName: 'a', shift: 5, minColumnWidth: 40 }))
        .toEqual({
          draftColumnWidths: [{ columnName: 'a', width: 45 }],
        });
    });

    it('should stick size to the min', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
        draftColumnWidths: [],
      };

      expect(draftTableColumnWidth(state, { columnName: 'b', shift: -25, minColumnWidth: 40 }))
        .toEqual({
          draftColumnWidths: [{ columnName: 'b', width: 40 }],
        });
    });
  });

  describe('#cancelTableColumnWidthDraft', () => {
    it('should work', () => {
      expect(cancelTableColumnWidthDraft())
        .toEqual({
          draftColumnWidths: [],
        });
    });
  });
});
