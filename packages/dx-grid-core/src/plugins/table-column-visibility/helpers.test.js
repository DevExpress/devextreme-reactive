import { showEmptyMessage } from './helpers';

describe('TableColumnVisibility helpers', () => {
  const defaultColumns = [
    { name: 'a' },
    { name: 'b' },
    { name: 'c' },
    { name: 'd' },
  ];

  describe('#showEmptyMessage', () => {
    it('should show empty message when all columns are hidden', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'b' },
      ];
      const hiddenColumns = ['b', 'c', 'd', 'a'];

      expect(showEmptyMessage(grouping, hiddenColumns, defaultColumns))
        .toBeTruthy();
    });

    it('should show empty message when all showed columns are grouped', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'b' },
      ];
      const hiddenColumns = ['b', 'c', 'd'];

      expect(showEmptyMessage(grouping, hiddenColumns, defaultColumns))
        .toBeTruthy();
    });

    it('should not show empty message while a showed column is not grouped', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'b' },
        { columnName: 'c' },
      ];
      const hiddenColumns = ['a', 'b', 'c'];

      expect(showEmptyMessage(grouping, hiddenColumns, defaultColumns))
        .toBeFalsy();
    });
  });
});
