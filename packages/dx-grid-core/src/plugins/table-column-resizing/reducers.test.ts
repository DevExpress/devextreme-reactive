import * as Immutable from 'seamless-immutable';
import {
  changeTableColumnWidth,
  draftTableColumnWidth,
  cancelTableColumnWidthDraft,
} from './reducers';
import {
  getColumnsSizes,
} from './helpers';

jest.mock('./helpers', () => ({
  getColumnsSizes: jest.fn(),
}));

describe('TableColumnResizing Plugin reducers', () => {
  const state = {
    columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
  };

  describe('#changeTableColumnWidth', () => {
    describe('standart resizing mode', () => {
      const nextColumnResizing = undefined;

      it('should work', () => {
        getColumnsSizes.mockImplementation(() => ({ size: 45 }));
        const payload = {
          columnName: 'a',
          nextColumnName: 'b',
          nextColumnResizing,
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

        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the min', () => {
        getColumnsSizes.mockImplementation(() => ({ size: 40 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
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

        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the max', () => {
        getColumnsSizes.mockImplementation(() => ({ size: 80 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
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

        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the min defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', minWidth: 50 },
        ];
        getColumnsSizes.mockImplementation(() => ({ size: 50 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
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

        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the max defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', maxWidth: 70 },
        ];
        getColumnsSizes.mockImplementation(() => ({ size: 70 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
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

        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should work if limitation is not defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b' },
        ];
        getColumnsSizes.mockImplementation(() => ({ size: 40 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
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

        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should work with immutable properties', () => {
        const immutableState = {
          columnWidths: Immutable([{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }]),
        };
        getColumnsSizes.mockImplementation(() => ({ size: 40 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: -25,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions: undefined,
        };

        expect(() => changeTableColumnWidth(immutableState, payload))
          .not.toThrow();

        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });
    });

    describe('nextColumn resizing mode', () => {
      const nextColumnResizing = true;

      it('should resize booth columns', () => {
        getColumnsSizes.mockImplementation(() => ({ size: 45, nextSize: 55 }));
        const payload = {
          columnName: 'a',
          nextColumnName: 'b',
          nextColumnResizing,
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

        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should block resize if booth columns have min width', () => {
        const columnExtensions = [
          { columnName: 'b', minWidth: 60 },
        ];
        getColumnsSizes.mockImplementation(() => ({ size: 40, nextSize: 60 }));
        const payloadAdd = {
          columnName: 'a',
          nextColumnName: 'b',
          nextColumnResizing,
          cachedWidths: { a: 40, b: 60 },
          shift: 5,
          minColumnWidth: 40,
          maxColumnWidth: Infinity,
          columnExtensions,
        };
        const payloadReduce = {
          columnName: 'a',
          nextColumnName: 'b',
          nextColumnResizing,
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
        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payloadAdd);

        expect(changeTableColumnWidth(state, payloadReduce))
          .toEqual({
            columnWidths: [{ columnName: 'a', width: 40 }, { columnName: 'b', width: 60 }],
          });
        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payloadReduce);
      });
    });
  });

  describe('#draftTableColumnWidth', () => {
    describe('standart resizing mode', () => {
      it('should work', () => {
        getColumnsSizes.mockImplementation(() => ({ size: 45 }));
        const payload = {
          columnName: 'a',
          nextColumnName: undefined,
          nextColumnResizing: undefined,
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
        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the min', () => {
        getColumnsSizes.mockImplementation(() => ({ size: 40 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing: undefined,
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
        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the max', () => {
        getColumnsSizes.mockImplementation(() => ({ size: 80 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing: undefined,
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
        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the min defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', minWidth: 50 },
        ];
        getColumnsSizes.mockImplementation(() => ({ size: 50 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing: undefined,
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
        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should stick size to the max defined in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b', maxWidth: 70 },
        ];
        getColumnsSizes.mockImplementation(() => ({ size: 70 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing: undefined,
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
        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });

      it('should work if limitation does not define in columnExtensions', () => {
        const columnExtensions = [
          { columnName: 'b' },
        ];
        getColumnsSizes.mockImplementation(() => ({ size: 40 }));
        const payload = {
          columnName: 'b',
          nextColumnName: undefined,
          nextColumnResizing: undefined,
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
        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
      });
    });

    describe('nextColumn resizing mode', () => {
      const nextColumnResizing = true;

      it('should return booth column widths', () => {
        getColumnsSizes.mockImplementation(() => ({ size: 45, nextSize: 55 }));
        const payload = {
          columnName: 'a',
          nextColumnName: 'b',
          nextColumnResizing,
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
        expect(getColumnsSizes).toBeCalledWith(state.columnWidths, payload);
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
