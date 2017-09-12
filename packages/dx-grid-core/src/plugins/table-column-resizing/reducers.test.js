import {
  changeTableColumnWidths,
  changeDraftTableColumnWidths,
} from './reducers';

describe('TableColumnResizing Plugin reducers', () => {
  describe('#changeTableColumnWidths', () => {
    it('should work', () => {
      const state = {
        columnWidths: { a: 40, b: 60 },
      };

      expect(changeTableColumnWidths(state, { shifts: { a: 5 } }))
        .toEqual({
          columnWidths: { a: 45, b: 60 },
          draftColumnWidths: {},
        });
    });

    it('should work with existing draft', () => {
      const state = {
        columnWidths: { a: 40, b: 60 },
        draftColumnWidths: { a: 45 },
      };

      expect(changeTableColumnWidths(state, { shifts: { a: 5 } }))
        .toEqual({
          columnWidths: { a: 45, b: 60 },
          draftColumnWidths: {},
        });
    });

    it('should stick size to the min', () => {
      const state = {
        columnWidths: { a: 40, b: 60 },
        draftColumnWidths: { a: 45 },
      };

      expect(changeTableColumnWidths(state, { shifts: { b: -25 } }))
        .toEqual({
          columnWidths: { a: 40, b: 40 },
          draftColumnWidths: {},
        });
    });
  });

  describe('#changeDraftTableColumnWidths', () => {
    it('should work', () => {
      const state = {
        columnWidths: { a: 40, b: 60 },
      };

      expect(changeDraftTableColumnWidths(state, { shifts: { a: 5 } }))
        .toEqual({
          columnWidths: { a: 40, b: 60 },
          draftColumnWidths: { a: 45 },
        });
    });

    it('should stick size to the min', () => {
      const state = {
        columnWidths: { a: 40, b: 60 },
        draftColumnWidths: {},
      };

      expect(changeDraftTableColumnWidths(state, { shifts: { b: -25 } }))
        .toEqual({
          columnWidths: { a: 40, b: 60 },
          draftColumnWidths: { b: 40 },
        });
    });

    it('should reset size when null passed', () => {
      const state = {
        columnWidths: { a: 40, b: 60 },
        draftColumnWidths: { b: 45 },
      };

      expect(changeDraftTableColumnWidths(state, { shifts: { b: null } }))
        .toEqual({
          columnWidths: { a: 40, b: 60 },
          draftColumnWidths: {},
        });
    });
  });
});
