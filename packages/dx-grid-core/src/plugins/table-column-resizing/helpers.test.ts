import * as Immutable from 'seamless-immutable';
import {
  getColumnSizes,
  isValidValue,
} from './helpers';

describe('TableColumnResizing Plugin helpers', () => {
  describe('#getColumnSizes', () => {
    const columnWidths = [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }];

    describe('standart resizing mode', () => {
      const columnResizingMode = 'widget';

      it('should work', () => {
        expect(getColumnSizes(columnWidths, {
          columnName: 'a',
          nextColumnName: 'b',
          columnResizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }))
          .toEqual({
            size: 45,
          });
      });

      it('should stick size to the min', () => {
        expect(getColumnSizes(columnWidths, {
          columnName: 'b',
          nextColumnName: undefined,
          columnResizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }))
          .toEqual({
            size: 40,
          });
      });

      it('should stick size to the max', () => {
        expect(getColumnSizes(columnWidths, {
          columnName: 'b',
          nextColumnName: undefined,
          columnResizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions: undefined,
        }))
          .toEqual({
            size: 80,
          });
      });

      it('should stick size to the min defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', minWidth: 50 },
        ];

        expect(getColumnSizes(columnWidths, {
          columnName: 'b',
          nextColumnName: undefined,
          columnResizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }))
          .toEqual({
            size: 50,
          });
      });

      it('should stick size to the max defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', maxWidth: 70 },
        ];

        expect(getColumnSizes(columnWidths, {
          columnName: 'b',
          nextColumnName: undefined,
          columnResizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }))
          .toEqual({
            size: 70,
          });
      });

      it('should work if limitation is not defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b' },
        ];

        expect(getColumnSizes(columnWidths, {
          columnName: 'b',
          nextColumnName: undefined,
          columnResizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        }))
          .toEqual({
            size: 40,
          });
      });

      it('should work with immutable properties', () => {
        const immutableColumnWidths = Immutable([
          { columnName: 'a', width: 40 }, { columnName: 'b', width: 60 },
        ]);

        expect(() => getColumnSizes(immutableColumnWidths, {
          columnName: 'b',
          nextColumnName: undefined,
          columnResizingMode,
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
      const columnResizingMode = 'nextColumn';

      it('should resize booth columns', () => {
        expect(getColumnSizes(columnWidths, {
          columnName: 'a',
          nextColumnName: 'b',
          columnResizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        }))
          .toEqual({
            size: 45, nextSize: 55,
          });
      });

      it('should block resize if booth columns have min width', () => {
        const columnExtensions = [
          { columnName: 'b', minWidth: 60 },
        ];

        expect(getColumnSizes(columnWidths, {
          columnName: 'a',
          nextColumnName: 'b',
          columnResizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions,
        }))
          .toEqual({
            size: 40, nextSize: 60,
          });

        expect(getColumnSizes(columnWidths, {
          columnName: 'a',
          nextColumnName: 'b',
          columnResizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions,
        }))
          .toEqual({
            size: 40, nextSize: 60,
          });
      });
    });
  });

  describe('#isValidValue', () => {
    const VALID_UNITS = ['px', '%', 'em', 'rem', 'vm', 'vh', 'vmin', 'vmax', ''];

    it('should return true for valid string value', () => {
      const values = [
        '10', '10px', 'auto', '10%', '10em', '10rem', '10vm', '10vh', '10vmin', '10vmax',
      ];

      values.forEach(value => expect(isValidValue(value, VALID_UNITS))
        .toBeTruthy());
    });

    it('should return false for invalid string value', () => {
      const values = ['px', '10pix', '10auto', '%', ''];

      values.forEach(value => expect(isValidValue(value, VALID_UNITS))
        .toBeFalsy());
    });
  });
});
