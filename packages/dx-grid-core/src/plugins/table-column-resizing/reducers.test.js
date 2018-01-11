import {
  changeTableColumnWidth,
  changeDraftTableColumnWidth,
} from './reducers';

describe('TableColumnResizing Plugin reducers', () => {
  describe('#changeTableColumnWidth', () => {
    it('should work', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
      };

      expect(changeTableColumnWidth(state, { columnName: 'a', shift: 5 }))
        .toEqual({
          columnWidths: [{ columnName: 'a', width: 45 }, { columnName: 'b', width: 60 }],
          draftColumnWidths: [],
        });
    });

    it('should work with existing draft', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
        draftColumnWidths: [{ columnName: 'a', width: 45 }],
      };

      expect(changeTableColumnWidth(state, { columnName: 'a', shift: 5 }))
        .toEqual({
          columnWidths: [{ columnName: 'a', width: 45 }, { columnName: 'b', width: 60 }],
          draftColumnWidths: [],
        });
    });

    it('should stick size to the min', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
        draftColumnWidths: [{ columnName: 'a', width: 45 }],
      };

      expect(changeTableColumnWidth(state, { columnName: 'b', shift: -25 }))
        .toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 40 }],
          draftColumnWidths: [],
        });
    });
  });

  describe('#changeDraftTableColumnWidth', () => {
    it('should work', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
        draftColumnWidths: [],
      };

      expect(changeDraftTableColumnWidth(state, { columnName: 'a', shift: 5 }))
        .toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
          draftColumnWidths: [{ columnName: 'a', width: 45 }],
        });
    });

    it('should stick size to the min', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
        draftColumnWidths: [],
      };

      expect(changeDraftTableColumnWidth(state, { columnName: 'b', shift: -25 }))
        .toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
          draftColumnWidths: [{ columnName: 'b', width: 40 }],
        });
    });

    it('should reset size when null passed', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
        draftColumnWidths: [{ columnName: 'b', width: 45 }],
      };

      expect(changeDraftTableColumnWidth(state, { columnName: 'b', shift: null }))
        .toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
          draftColumnWidths: [],
        });
    });
  });
});
