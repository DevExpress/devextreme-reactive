import { TABLE_DATA_TYPE } from '../table/constants';
import { isEmptyMessageShow } from './helpers';

describe('TableColumnVisibility helpers', () => {
  describe('#isEmptyMessageShow', () => {
    it('should show empty message when all columns are hidden', () => {
      const tableColumns = [];

      expect(isEmptyMessageShow(tableColumns))
        .toBeTruthy();
    });

    it('should show empty message when all showed columns are grouped', () => {
      const tableColumns = [
        { type: 'any', column: { name: 'a' } },
      ];

      expect(isEmptyMessageShow(tableColumns))
        .toBeTruthy();
    });

    it('should not show empty message while a showed column is not grouped', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ];

      expect(isEmptyMessageShow(tableColumns))
        .toBeFalsy();
    });
  });
});
