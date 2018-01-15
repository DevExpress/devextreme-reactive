import { TABLE_DATA_TYPE } from '../table/constants';
import { tableDataColumnsExist } from './helpers';

describe('TableColumnVisibility helpers', () => {
  describe('#tableDataColumnsExist', () => {
    it('should show empty message when all columns are hidden', () => {
      const tableColumns = [];

      expect(tableDataColumnsExist(tableColumns))
        .toBeFalsy();
    });

    it('should show empty message when all shown columns are grouped', () => {
      const tableColumns = [
        { type: 'any', column: { name: 'a' } },
      ];

      expect(tableDataColumnsExist(tableColumns))
        .toBeFalsy();
    });

    it('should not show empty message while a shown column is not grouped', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ];

      expect(tableDataColumnsExist(tableColumns))
        .toBeTruthy();
    });
  });
});
