import { DATA_TYPE, NODATA_TYPE } from './constants';
import {
  isNoDataTableRow,
  isDataTableCell,
  isHeaderStubTableCell,
} from './helpers';

describe('TableView Plugin helpers', () => {
  describe('#isNoDataTableRow', () => {
    it('should work', () => {
      expect(isNoDataTableRow({ type: NODATA_TYPE }))
        .toBeTruthy();
      expect(isNoDataTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isDataTableCell', () => {
    it('should work', () => {
      expect(isDataTableCell({ type: DATA_TYPE }, { type: DATA_TYPE }))
        .toBeTruthy();
      expect(isDataTableCell({ type: 'undefined' }, { type: DATA_TYPE }))
        .toBeFalsy();
      expect(isDataTableCell({ type: DATA_TYPE }, { type: 'undefined' }))
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
