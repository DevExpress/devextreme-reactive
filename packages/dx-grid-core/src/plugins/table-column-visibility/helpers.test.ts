import { TABLE_DATA_TYPE } from '../table/constants';
import { tableDataColumnsExist } from './helpers';

describe('TableColumnVisibility helpers', () => {
  describe('#tableDataColumnsExist', () => {
    it('should return false when there are no table columns', () => {
      const tableColumns = [];

      expect(tableDataColumnsExist(tableColumns))
        .toBeFalsy();
    });

    it('should return false if no data type columns are provided', () => {
      const tableColumns = [
        { type: 'any', column: { name: 'a' } },
      ];

      expect(tableDataColumnsExist(tableColumns))
        .toBeFalsy();
    });

    it('should return true when data type columns are specified', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ];

      expect(tableDataColumnsExist(tableColumns))
        .toBeTruthy();
    });
  });
});
