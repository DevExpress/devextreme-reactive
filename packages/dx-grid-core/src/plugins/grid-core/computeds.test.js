import {
  gridRows,
  gridRowIdGetter,
  cellValueGetter,
} from './computeds';

describe('GridCore Plugin computeds', () => {
  describe('#gridRows', () => {
    it('should work', () => {
      const data = [{ a: 1 }, { a: 2 }];

      expect(gridRows(data))
        .toEqual([
          { row: { a: 1 }, defaultRowId: 0 },
          { row: { a: 2 }, defaultRowId: 1 },
        ]);
    });
  });

  describe('#gridRowIdGetter', () => {
    it('should work with default ids', () => {
      const data = [
        { row: { a: 1 }, defaultRowId: 0 },
        { row: { a: 2 }, defaultRowId: 1 },
      ];
      const getRowId = null;

      expect(gridRowIdGetter(getRowId)(data[0]))
        .toEqual(0);
      expect(gridRowIdGetter(getRowId)(data[1]))
        .toEqual(1);
    });

    it('should work with custom func', () => {
      const data = [
        { row: { a: 1 }, defaultRowId: 0 },
        { row: { a: 2 }, defaultRowId: 1 },
      ];
      const getRowId = row => row.a;

      expect(gridRowIdGetter(getRowId)(data[0]))
        .toEqual(1);
      expect(gridRowIdGetter(getRowId)(data[1]))
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
