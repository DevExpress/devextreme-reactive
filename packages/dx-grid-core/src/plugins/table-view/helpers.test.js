import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';
import {
  isNoDataTableRow,
  isDataTableCell,
  isHeaderStubTableCell,
} from './helpers';

describe('TableView Plugin helpers', () => {
  describe('#isNoDataTableRow', () => {
    it('should work', () => {
      expect(isNoDataTableRow({ type: TABLE_NODATA_TYPE }))
        .toBeTruthy();
      expect(isNoDataTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });
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
});
