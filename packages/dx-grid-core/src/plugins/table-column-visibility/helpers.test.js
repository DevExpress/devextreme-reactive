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
      const hiddenColumns = defaultColumns;

      expect(showEmptyMessage(grouping, hiddenColumns, defaultColumns))
        .toBeTruthy();
    });

    it('should show empty message when all showed columns are grouped', () => {
      const grouping = [
        { columnName: 'a' },
        { columnName: 'b' },
      ];
      const hiddenColumns = [
        { columnName: 'b' },
        { columnName: 'a' },
      ];

      expect(showEmptyMessage(grouping, hiddenColumns, defaultColumns))
        .toBeTruthy();
    });
  });
});
