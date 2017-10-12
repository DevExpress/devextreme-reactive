import {
  rowIdGetter,
  cellValueGetter,
} from './computeds';

describe('GridCore Plugin computeds', () => {
  describe('#rowIdGetter', () => {
    it('should work with default ids', () => {
      const data = [
        { a: 1 },
        { a: 2 },
      ];
      const getRowId = null;

      expect(rowIdGetter(getRowId, data)(data[0]))
        .toEqual(0);
      expect(rowIdGetter(getRowId, data)(data[1]))
        .toEqual(1);
    });

    it('should work with custom func', () => {
      const data = [
        { a: 1 },
        { a: 2 },
      ];
      const getRowId = row => row.a;

      expect(rowIdGetter(getRowId, data)(data[0]))
        .toEqual(1);
      expect(rowIdGetter(getRowId, data)(data[1]))
        .toEqual(2);
    });
  });

  describe('#cellValueGetter', () => {
    it('should work with default cell access', () => {
      const columns = [{ name: 'a' }, { name: 'b' }];
      const getCellValue = null;

      expect(cellValueGetter(getCellValue, columns)({ a: 1 }, 'a'))
        .toEqual(1);
      expect(cellValueGetter(getCellValue, columns)({ b: 2 }, 'b'))
        .toEqual(2);
    });

    it('should work with column defined cell access', () => {
      const columns = [{ name: 'a', getCellValue: row => row.b }, { name: 'b' }];
      const getCellValue = null;

      expect(cellValueGetter(getCellValue, columns)({ b: 1 }, 'a'))
        .toEqual(1);
      expect(cellValueGetter(getCellValue, columns)({ b: 2 }, 'b'))
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
