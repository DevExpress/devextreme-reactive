import {
  changeTableColumnWidths,
  changeDraftTableColumnWidths,
} from './reducers';

describe('TableColumnResizing Plugin reducers', () => {
  describe('#changeTableColumnWidths', () => {
    it('should work', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
      };

      expect(changeTableColumnWidths(state, { shifts: { a: 5 } }))
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

      expect(changeTableColumnWidths(state, { shifts: { a: 5 } }))
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

      expect(changeTableColumnWidths(state, { shifts: { b: -25 } }))
        .toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 40 }],
          draftColumnWidths: [],
        });
    });
  });

  describe('#changeDraftTableColumnWidths', () => {
    it('should work', () => {
      const state = {
        columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
        draftColumnWidths: [],
      };

      expect(changeDraftTableColumnWidths(state, { shifts: { a: 5 } }))
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

      expect(changeDraftTableColumnWidths(state, { shifts: { b: -25 } }))
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

      expect(changeDraftTableColumnWidths(state, { shifts: { b: null } }))
        .toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
          draftColumnWidths: [],
        });
    });
  });
});
