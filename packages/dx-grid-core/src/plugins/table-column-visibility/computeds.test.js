import { visibleTableColumns } from './computeds';

describe('TableColumnVisibility computeds', () => {
  describe('#visibleTableColumns', () => {
    it('should return a correct array of visible table columns', () => {
      const tableColumns = [
        { column: { name: 'a' } },
        { column: { name: 'b' } },
        { column: { name: 'c' } },
        { column: { name: 'd' } },
      ];
      const hiddenColumns = ['a', 'c', 'd'];

      expect(visibleTableColumns(tableColumns, hiddenColumns))
        .toEqual([{ column: { name: 'b' } }]);
    });
  });
});
