import { columnChooserItems } from './computeds';

describe('ColumnChooser computeds', () => {
  describe('#columnChooserItems', () => {
    it('should return items correctly', () => {
      const columns = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
      const hiddenColumnNames = ['c', 'a'];

      expect(columnChooserItems(columns, hiddenColumnNames))
        .toEqual([
          { column: { name: 'a' }, hidden: true },
          { column: { name: 'b' }, hidden: false },
          { column: { name: 'c' }, hidden: true },
        ]);
    });
  });
});
