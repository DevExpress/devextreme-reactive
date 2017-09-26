import {
  dataRows,
  rowIdGetter,
  cellValueGetter,
} from './computeds';

describe('GridCore Plugin computeds', () => {
  describe('#dataRows', () => {
    it('should work', () => {
      const data = [{ a: 1 }, { a: 2 }];

      expect(dataRows(data))
        .toEqual([
          { rowData: { a: 1 }, defaultRowId: 0 },
          { rowData: { a: 2 }, defaultRowId: 1 },
        ]);
    });
  });

  describe('#rowIdGetter', () => {
    it('should work with default ids', () => {
      const data = [
        { rowData: { a: 1 }, defaultRowId: 0 },
        { rowData: { a: 2 }, defaultRowId: 1 },
      ];
      const getRowDataId = null;

      expect(rowIdGetter(getRowDataId)(data[0]))
        .toEqual(0);
      expect(rowIdGetter(getRowDataId)(data[1]))
        .toEqual(1);
    });

    it('should work with custom func', () => {
      const data = [
        { rowData: { a: 1 }, defaultRowId: 0 },
        { rowData: { a: 2 }, defaultRowId: 1 },
      ];
      const getRowDataId = rowData => rowData.a;

      expect(rowIdGetter(getRowDataId)(data[0]))
        .toEqual(1);
      expect(rowIdGetter(getRowDataId)(data[1]))
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
      const columns = [{ name: 'a', getCellValue: rowData => rowData.b }, { name: 'b' }];
      const getCellValue = null;

      expect(cellValueGetter(getCellValue, columns)({ b: 1 }, 'a'))
        .toEqual(1);
      expect(cellValueGetter(getCellValue, columns)({ b: 2 }, 'b'))
        .toEqual(2);
    });

    it('should work with defined cell access', () => {
      const columns = [{ name: 'a' }, { name: 'b' }];
      const getCellValue = (rowData, columnName) => rowData[`_${columnName}`];

      expect(cellValueGetter(getCellValue, columns)({ _a: 1 }, 'a'))
        .toEqual(1);
      expect(cellValueGetter(getCellValue, columns)({ _b: 2 }, 'b'))
        .toEqual(2);
    });
  });
});
