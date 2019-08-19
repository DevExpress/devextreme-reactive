import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';
import {
  isDataTableCell,
  isHeaderStubTableCell,
  isDataTableRow,
  isNoDataTableRow,
  isNoDataTableCell,
  convertWidth,
} from './helpers';

describe('Table Plugin helpers', () => {
  describe('#isDataTableCell', () => {
    it('should work', () => {
      expect(isDataTableCell({ type: TABLE_DATA_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isDataTableCell({ type: 'undefined' }, { type: TABLE_DATA_TYPE }))
        .toBeFalsy();
      expect(isDataTableCell({ type: TABLE_DATA_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isDataTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isHeaderStubTableCell', () => {
    it('should work', () => {
      const row = { type: 'undefined' };
      expect(isHeaderStubTableCell(row, [row]))
        .toBeTruthy();
      expect(isHeaderStubTableCell(row, []))
        .toBeFalsy();
    });
  });
  describe('#isDataTableRow', () => {
    it('should work', () => {
      expect(isDataTableRow({ type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isDataTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isNoDataTableRow', () => {
    it('should work', () => {
      expect(isNoDataTableRow({ type: TABLE_NODATA_TYPE }))
        .toBeTruthy();
      expect(isNoDataTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isNoDataTableCell', () => {
    it('should work', () => {
      const column = { type: 'undefined' };
      expect(isNoDataTableCell(column, [column]))
        .toBeTruthy();
      expect(isNoDataTableCell(column, [{ type: 'undefined' }, column]))
        .toBeFalsy();
    });
  });
  describe('#convertWidth', () => {
    it('should work', () => {
      const width = 100;
      const VALID_UNITS = ['px', '%', 'em', 'rem', 'vm', 'vh', 'vmin', 'vmax', ''];

      expect(convertWidth('a', width))
        .toEqual(width);
      expect(convertWidth('a', 'auto'))
        .toEqual('auto');
      VALID_UNITS.forEach((unit) => {
        const converted = convertWidth('a', `${width}${unit}`);
        const result = unit === ''
          ? width
          : `${width}${unit}`;
        expect(converted === result).toBeTruthy();
      });
    });

    it('should throw error on invalid values', () => {
      const values = ['px', '%', '10auto', ''];

      values.forEach(value => expect(() => convertWidth('a', value))
        .toThrow(/"a".*width/));
    });
  });
});
