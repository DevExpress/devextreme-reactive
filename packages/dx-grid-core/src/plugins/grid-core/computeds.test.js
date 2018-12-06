import { format } from 'util';
import {
  rowIdGetter,
  cellValueGetter,
} from './computeds';

describe('GridCore Plugin computeds', () => {
  describe('#rowIdGetter', () => {
    const data = [
      { a: 1 },
      { a: 2 },
    ];

    it('should work with default ids', () => {
      const getRowId = null;

      expect(rowIdGetter(getRowId, data)(data[0]))
        .toEqual(0);
      expect(rowIdGetter(getRowId, data)(data[1]))
        .toEqual(1);
    });

    it('should work with custom func', () => {
      const getRowId = row => row.a;

      expect(rowIdGetter(getRowId, data)(data[0]))
        .toEqual(1);
      expect(rowIdGetter(getRowId, data)(data[1]))
        .toEqual(2);
    });

    describe('warning if row id is undefined', () => {
      /* eslint-disable no-console */
      let warnLog;
      let savedWarn;
      beforeEach(() => {
        warnLog = [];
        savedWarn = console.warn;
        console.warn = (...args) => {
          warnLog.push(format(...args));
        };
      });
      afterEach(() => {
        console.warn = savedWarn;
      });
      /* eslint-enable no-console */

      it('should throw a warning if custom func returns undefined', () => {
        const getRowId = () => undefined;

        rowIdGetter(getRowId, data)(data[0]);

        expect(warnLog[0])
          .toEqual('The row id is undefined. Check the getRowId function. The row is { a: 1 }');
      });

      it('should not warn otherwise', () => {
        const getRowId = row => row.a;

        rowIdGetter(getRowId, data)(data[0]);

        expect(warnLog.length).toBe(0);
      });
    });
  });

  describe('#cellValueGetter', () => {
    it('should work with default cell access', () => {
      const columns = [{ name: 'a' }, { name: 'b' }];

      expect(cellValueGetter(undefined, columns)({ a: 1 }, 'a'))
        .toEqual(1);
      expect(cellValueGetter(undefined, columns)({ b: 2 }, 'b'))
        .toEqual(2);
    });

    it('should work with column defined cell access', () => {
      const columns = [{ name: 'a', getCellValue: row => row.a + 1 }, { name: 'b' }];

      expect(cellValueGetter(undefined, columns)({ a: 1 }, 'a'))
        .toEqual(2);
      expect(cellValueGetter(undefined, columns)({ b: 2 }, 'b'))
        .toEqual(2);
    });

    it('should work with defined cell access', () => {
      const columns = [{ name: 'a' }, { name: 'b' }];
      const getCellValue = (row, columnName) => row[`_${columnName}`];

      expect(cellValueGetter(getCellValue, columns)({ _a: 1 }, 'a'))
        .toEqual(1);
      expect(cellValueGetter(getCellValue, columns)({ _b: 2 }, 'b'))
        .toEqual(2);
    });
  });
});
