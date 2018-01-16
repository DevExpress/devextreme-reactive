import { TABLE_DATA_TYPE } from '../table/constants';
import { tableDataColumnsExist } from './helpers';

describe('TableColumnVisibility helpers', () => {
  describe('#tableDataColumnsExist', () => {
    it('should return false when table columns are not exist', () => {
      const tableColumns = [];

      expect(tableDataColumnsExist(tableColumns))
        .toBeFalsy();
    });

    it('should return false when a data type columns are not exist', () => {
      const tableColumns = [
        { type: 'any', column: { name: 'a' } },
      ];

      expect(tableDataColumnsExist(tableColumns))
        .toBeFalsy();
    });

    it('should return true while a data type columns are exist', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ];

      expect(tableDataColumnsExist(tableColumns))
        .toBeTruthy();
    });
  });
});
