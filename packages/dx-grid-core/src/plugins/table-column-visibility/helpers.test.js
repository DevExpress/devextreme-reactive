import { TABLE_DATA_TYPE } from '../table/constants';
import { isEmptyMessageShown } from './helpers';

describe('TableColumnVisibility helpers', () => {
  describe('#isEmptyMessageShown', () => {
    it('should show empty message when all columns are hidden', () => {
      const tableColumns = [];

      expect(isEmptyMessageShown(tableColumns))
        .toBeTruthy();
    });

    it('should show empty message when all shown columns are grouped', () => {
      const tableColumns = [
        { type: 'any', column: { name: 'a' } },
      ];

      expect(isEmptyMessageShown(tableColumns))
        .toBeTruthy();
    });

    it('should not show empty message while a shown column is not grouped', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ];

      expect(isEmptyMessageShown(tableColumns))
        .toBeFalsy();
    });
  });
});
