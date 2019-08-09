import * as Immutable from 'seamless-immutable';
import {
  changeTableColumnWidth,
  draftTableColumnWidth,
  cancelTableColumnWidthDraft,
} from './reducers';

describe('TableColumnResizing Plugin reducers', () => {
  const state = {
    columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
  };

  describe('#changeTableColumnWidth', () => {
    it('should work', () => {
      expect(changeTableColumnWidth(state, {
        columnName: 'a',
        width: 40,
        shift: 5,
        minColumnWidth: 40,
        maxColumnWidth: Infinity,
      }))
        .toEqual({
          columnWidths: [{ columnName: 'a', width: 45 }, { columnName: 'b', width: 60 }],
        });
    });

    it('should stick size to the min', () => {
      expect(changeTableColumnWidth(state, {
        columnName: 'b',
        shift: -25,
        minColumnWidth: 40,
        maxColumnWidth: Infinity,
        columnExtensions: undefined,
      })).
        toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 40 }],
        });
    });

    it('should stick size to the max', () => {
      expect(changeTableColumnWidth(state, {
        columnName: 'b',
        shift: +25,
        minColumnWidth: 40,
        maxColumnWidth: 80,
        columnExtensions: undefined,
      })).
        toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 80 }],
        });
    });

    it('should stick size to the min defined in columnExtensions', () => {
      const columnExtensions = [
        { columnName: 'b', minWidth: 50 },
      ];

      expect(changeTableColumnWidth(state, {
        columnName: 'b',
        shift: -25,
        minColumnWidth: 40,
        maxColumnWidth: 80,
        columnExtensions,
      })).
        toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 50 }],
        });
    });

    it('should stick size to the max defined in columnExtensions', () => {
      const columnExtensions = [
        { columnName: 'b', maxWidth: 70 },
      ];

      expect(changeTableColumnWidth(state, {
        columnName: 'b',
        shift: +25,
        minColumnWidth: 40,
        maxColumnWidth: 80,
        columnExtensions,
      })).
        toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 70 }],
        });
    });

    it('should work if limitation is not defined in columnExtensions', () => {
      const columnExtensions = [
        { columnName: 'b' },
      ];

      expect(changeTableColumnWidth(state, {
        columnName: 'b',
        shift: -25,
        minColumnWidth: 40,
        maxColumnWidth: 80,
        columnExtensions,
      })).
        toEqual({
          columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 40 }],
        });
    });

    it('should work with immutable properties', () => {
      const immutableState = {
        columnWidths: Immutable([{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }]),
      };

      expect(() => changeTableColumnWidth(
          immutableState,
          { columnName: 'b', shift: -25, minColumnWidth: 40, maxColumnWidth: Infinity }),
        ).not.toThrow();
    });
  });

  describe('#draftTableColumnWidth', () => {
    it('should work', () => {
      expect(draftTableColumnWidth(state, {
        columnName: 'a',
        shift: 5,
        minColumnWidth: 40,
        maxColumnWidth: Infinity,
        columnExtensions: undefined,
      })).
        toEqual({
          draftColumnWidths: [{ columnName: 'a', width: 45 }],
        });
    });

    it('should stick size to the min', () => {
      expect(draftTableColumnWidth(state, {
        columnName: 'b',
        shift: -25,
        minColumnWidth: 40,
        maxColumnWidth: Infinity,
        columnExtensions: undefined,
      }))
        .toEqual({
          draftColumnWidths: [{ columnName: 'b', width: 40 }],
        });
    });

    it('should stick size to the max', () => {
      expect(draftTableColumnWidth(state, {
        columnName: 'b',
        shift: +25,
        minColumnWidth: 40,
        maxColumnWidth: 80,
        columnExtensions: undefined,
      })).toEqual({
        draftColumnWidths: [{ columnName: 'b', width: 80 }],
      });
    });

    it('should stick size to the min defined in columnExtensions', () => {
      const columnExtensions = [
        { columnName: 'b', minWidth: 50 },
      ];

      expect(draftTableColumnWidth(state, {
        columnName: 'b',
        shift: -25,
        minColumnWidth: 40,
        maxColumnWidth: 80,
        columnExtensions,
      })).
        toEqual({
          draftColumnWidths: [{ columnName: 'b', width: 50 }],
        });
    });

    it('should stick size to the max defined in columnExtensions', () => {
      const columnExtensions = [
        { columnName: 'b', maxWidth: 70 },
      ];

      expect(draftTableColumnWidth(state, {
        columnName: 'b',
        shift: +25,
        minColumnWidth: 40,
        maxColumnWidth: 80,
        columnExtensions,
      })).
        toEqual({
          draftColumnWidths: [{ columnName: 'b', width: 70 }],
        });
    });

    it('should work if limitation does not define in columnExtensions', () => {
      const columnExtensions = [
        { columnName: 'b' },
      ];

      expect(draftTableColumnWidth(state, {
        columnName: 'b',
        shift: -25,
        minColumnWidth: 40,
        maxColumnWidth: 80,
        columnExtensions,
      })).
        toEqual({
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
