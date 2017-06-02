import {
  tableColumnKeyGetter,
  getTableColumnGeometries,
  getTableColumnGeometriesChanges,
} from './table';

describe('table utils', () => {
  describe('#tableColumnKeyGetter', () => {
    it('should correctly return keys', () => {
      const columns = [{ type: 'test' }, { name: 'a' }, { name: 'b' }];

      expect(columns.map(tableColumnKeyGetter)).toEqual([
        'test_$0',
        'data_a',
        'data_b',
      ]);
    });
  });

  describe('#getTableColumnGeometries', () => {
    it('should correctly return geometries', () => {
      const columns = [{ width: 100 }, {}, {}];

      expect(getTableColumnGeometries(columns, 200)).toEqual([
        { left: 0, right: 100 },
        { left: 100, right: 150 },
        { left: 150, right: 200 },
      ]);

      expect(getTableColumnGeometries(columns, 400)).toEqual([
        { left: 0, right: 100 },
        { left: 100, right: 250 },
        { left: 250, right: 400 },
      ]);
    });
  });
});
