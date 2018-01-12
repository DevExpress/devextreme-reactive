import { TABLE_DATA_TYPE, GRID_GROUP_TYPE } from '@devexpress/dx-core';
import { isEmptyMessageShow } from './helpers';

describe('TableColumnVisibility helpers', () => {
  describe('#isEmptyMessageShow', () => {
    it('should show empty message when all columns are hidden', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'b' },
      ];

      expect(isEmptyMessageShow(grouping, []))
        .toBeTruthy();
    });

    it('should show empty message when all showed columns are grouped', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'b' },
      ];
      const tableColumns = [
        { type: GRID_GROUP_TYPE, column: { name: 'a' } },
      ];

      expect(isEmptyMessageShow(grouping, tableColumns))
        .toBeTruthy();
    });

    it('should not show empty message while a showed column is not grouped', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'b' },
        { columnName: 'c' },
      ];
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
      ];

      expect(isEmptyMessageShow(grouping, tableColumns))
        .toBeFalsy();
    });
  });
});
