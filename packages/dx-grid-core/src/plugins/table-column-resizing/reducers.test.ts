// tslint:disable-next-line: import-name
import Immutable from 'seamless-immutable';
import {
  changeTableColumnWidth,
  draftTableColumnWidth,
  cancelTableColumnWidthDraft,
} from './reducers';
import {
  getColumnSizes,
} from './helpers';

jest.mock('./helpers', () => ({
  getColumnSizes: jest.fn(),
}));

describe('TableColumnResizing Plugin reducers', () => {
  const state = {
    columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
  };

  describe('#changeTableColumnWidth', () => {
    describe('standart resizing mode', () => {
      const resizingMode = 'widget';

      it('should work', () => {
        getColumnSizes.mockImplementation(() => ({ size: 45 }));
        const payload = {
          columnName: 'a',
          nextColumnName: 'b',
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        };

        expect(changeTableColumnWidth(state, payload))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 45 }, { columnName: 'b', width: 60 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the min', () => {
        getColumnSizes.mockImplementation(() => ({ size: 40 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        };

        expect(changeTableColumnWidth(state, payload))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 40 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the max', () => {
        getColumnSizes.mockImplementation(() => ({ size: 80 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions: undefined,
        };

        expect(changeTableColumnWidth(state, payload))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 80 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the min defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', minWidth: 50 },
        ];
        getColumnSizes.mockImplementation(() => ({ size: 50 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        };

        expect(changeTableColumnWidth(state, payload))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 50 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the max defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', maxWidth: 70 },
        ];
        getColumnSizes.mockImplementation(() => ({ size: 70 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        };

        expect(changeTableColumnWidth(state, payload))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 70 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should work if limitation is not defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b' },
        ];
        getColumnSizes.mockImplementation(() => ({ size: 40 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        };

        expect(changeTableColumnWidth(state, payload))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 40 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should work with immutable properties', () => {
        const immutableState = {
          columnWidths: Immutable([{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }]),
        };
        getColumnSizes.mockImplementation(() => ({ size: 40 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        };

        expect(() => changeTableColumnWidth(immutableState, payload))
          .not.toThrow();
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });
    });

    describe('nextColumn resizing mode', () => {
      const resizingMode = 'nextColumn';

      it('should resize both columns', () => {
        getColumnSizes.mockImplementation(() => ({ size: 45, nextSize: 55 }));
        const payload = {
          columnName: 'a',
          nextColumnName: 'b',
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        };

        expect(changeTableColumnWidth(state, payload))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 45 }, { columnName: 'b', width: 55 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should block resize if both columns have min width', () => {
        const columnExtensions = [
          { columnName: 'b', minWidth: 60 },
        ];
        getColumnSizes.mockImplementation(() => ({ size: 40, nextSize: 60 }));
        const payloadAdd = {
          columnName: 'a',
          nextColumnName: 'b',
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions,
        };
        const payloadReduce = {
          columnName: 'a',
          nextColumnName: 'b',
          resizingMode,
          cachedWidths: { a: 40, b: 60 },
          shift: -5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions,
        };

        expect(changeTableColumnWidth(state, payloadAdd))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payloadAdd);

        expect(changeTableColumnWidth(state, payloadReduce))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payloadReduce);
      });
    });
  });

  describe('#draftTableColumnWidth', () => {
    describe('standart resizing mode', () => {
      it('should work', () => {
        getColumnSizes.mockImplementation(() => ({ size: 45 }));
        const payload = {
          columnName: 'a',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        };

        expect(draftTableColumnWidth(state, payload))
          .toEqual({
            draftColumnWidths: [{ columnName: 'a', width: 45 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the min', () => {
        getColumnSizes.mockImplementation(() => ({ size: 40 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        };

        expect(draftTableColumnWidth(state, payload))
          .toEqual({
            draftColumnWidths: [{ columnName: 'b', width: 40 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the max', () => {
        getColumnSizes.mockImplementation(() => ({ size: 80 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions: undefined,
        };

        expect(draftTableColumnWidth(state, payload))
          .toEqual({
            draftColumnWidths: [{ columnName: 'b', width: 80 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the min defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', minWidth: 50 },
        ];
        getColumnSizes.mockImplementation(() => ({ size: 50 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        };

        expect(draftTableColumnWidth(state, payload))
          .toEqual({
            draftColumnWidths: [{ columnName: 'b', width: 50 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the max defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', maxWidth: 70 },
        ];
        getColumnSizes.mockImplementation(() => ({ size: 70 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: +25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        };

        expect(draftTableColumnWidth(state, payload))
          .toEqual({
            draftColumnWidths: [{ columnName: 'b', width: 70 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should work if limitation does not define in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b' },
        ];
        getColumnSizes.mockImplementation(() => ({ size: 40 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          resizingMode: 'widget',
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions,
        };

        expect(draftTableColumnWidth(state, payload))
          .toEqual({
            draftColumnWidths: [{ columnName: 'b', width: 40 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
      });
    });

    describe('nextColumn resizing mode', () => {
      it('should return both column widths', () => {
        getColumnSizes.mockImplementation(() => ({ size: 45, nextSize: 55 }));
        const payload = {
          columnName: 'a',
          nextColumnName: 'b',
          resizingMode: 'nextColumn',
          cachedWidths: { a: 40, b: 60 },
          shift: +5,
          minColumnWidth: 40,
          maxColumnWidth: 80,
          columnExtensions: undefined,
        };

        expect(draftTableColumnWidth(state, payload))
          .toEqual({
            draftColumnWidths: [{ columnName: 'a', width: 45 }, { columnName: 'b', width: 55 }],
          });
        expect(getColumnSizes).toBeCalledWith(state.columnWidths, payload);
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
});
