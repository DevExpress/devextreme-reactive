import { visibleTableColumns } from './computeds';

describe('HiddenTableColumns computeds', () => {
  describe('#visibleTableColumns', () => {
    it('should return a correct array of visible table columns', () => {
      const tableColumns = [
        { column: { name: 'a' } },
        { column: { name: 'b' } },
        { column: { name: 'c' } },
        { column: { name: 'd' } },
      ];
      const hiddenColumnNames = ['a', 'c', 'd'];
      expect(visibleTableColumns(tableColumns, hiddenColumnNames))
        .toEqual([{ column: { name: 'b' } }]);
    });
  });
});
