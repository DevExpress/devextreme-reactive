import * as Immutable from 'seamless-immutable';
import {
  getColumnsSizes,
  isValidValue,
} from './helpers';

describe('TableColumnResizing Plugin helpers', () => {
  describe('#getColumnSizes', () => {
    const columnWidths = [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }];

    describe('standart resizing mode', () => {
      const nextColumnResizing = undefined;

      fit('should work', () => {
        expect(getColumnsSizes(columnWidths, {
          columnName: 'a',
          nextColumnName: 'b',
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 45 }, { columnName: 'b', width: 60 }],
          });
      });

      it('should stick size to the min', () => {
        expect(getColumnsSizes(state, {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 40 }],
          });
      });

      it('should stick size to the max', () => {
        expect(getColumnsSizes(state, {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions: undefined,
        }))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 80 }],
          });
      });

      it('should stick size to the min defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', minWidth: 50 },
        ];

        expect(getColumnsSizes(state, {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 50 }],
          });
      });

      it('should stick size to the max defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', maxWidth: 70 },
        ];

        expect(getColumnsSizes(state, {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 70 }],
          });
      });

      it('should work if limitation is not defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b' },
        ];

        expect(getColumnsSizes(state, {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 40 }],
          });
      });

      it('should work with immutable properties', () => {
        const immutableState = {
          columnWidths: Immutable([{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }]),
        };

        expect(() => getColumnsSizes(immutableState, {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }))
          .not.toThrow();
      });
    });

    describe('nextColumn resizing mode', () => {
      const nextColumnResizing = true;

      it('should resize booth columns', () => {
        expect(getColumnsSizes(state, {
          columnName: 'a',
          nextColumnName: 'b',
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 45 }, { columnName: 'b', width: 55 }],
          });
      });

      it('should block resize if booth columns have min width', () => {
        const columnExtensions = [
          { columnName: 'b', minWidth: 60 },
        ];

        expect(getColumnsSizes(state, {
          columnName: 'a',
          nextColumnName: 'b',
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions,
        }))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
          });

        expect(getColumnsSizes(state, {
          columnName: 'a',
          nextColumnName: 'b',
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: -5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions,
        }))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
          });
      });
    });
  });
});
