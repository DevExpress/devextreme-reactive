import {
  tableColumnKeyGetter,
  tableRowKeyGetter,
  getTableColumnGeometries,
  getTableTargetColumnIndex,
} from './table';

describe('table utils', () => {
  describe('#tableColumnKeyGetter', () => {
    it('should correctly return keys', () => {
      const columns = [{ type: 'test' }, { type: 'test', id: 'a' }, { name: 'a' }, { name: 'b', id: 'bb' }];

      expect(columns.map(tableColumnKeyGetter))
        .toEqual([
          'test_$0',
          'test_a',
          'data_a',
          'data_b',
        ]);
    });
  });

  describe('#tableRowKeyGetter', () => {
    it('should correctly return keys', () => {
      const rows = [{ type: 'test' }, { type: 'test', id: 'a' }, { name: 'a' }, { name: 'b', id: 'bb' }];
      const getRowId = row => rows.filter(r => !r.type).indexOf(row);

      expect(rows.map((row, rowIndex) => tableRowKeyGetter(getRowId, row, rowIndex)))
        .toEqual([
          'test_$0',
          'test_a',
          'data_0',
          'data_1',
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

  describe('#getTableTargetColumnIndex', () => {
    it('should correctly return index', () => {
      const columnGeometries = [
        { left: 0, right: 100 },
        { left: 100, right: 150 },
        { left: 150, right: 200 },
        { left: 200, right: 300 },
      ];

      expect(getTableTargetColumnIndex(columnGeometries, 1, 70)).toEqual(1);
      expect(getTableTargetColumnIndex(columnGeometries, 1, 40)).toEqual(0);
      expect(getTableTargetColumnIndex(columnGeometries, 1, 240)).toEqual(2);
      expect(getTableTargetColumnIndex(columnGeometries, 1, 260)).toEqual(3);
    });
  });
});
