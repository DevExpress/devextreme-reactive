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

  describe('#getTableColumnGeometriesChanges', () => {
    it('should return geometry changes after column order change', () => {
      const prev = [{ width: 100, type: 'test' }, { name: 'a' }, { name: 'b' }];
      const next = [{ width: 100, type: 'test' }, { name: 'b' }, { name: 'a' }];

      expect(getTableColumnGeometriesChanges(prev, next, 200))
        .toEqual({
          data_a: { left: { from: 100, to: 150 } },
          data_b: { left: { from: 150, to: 100 } },
        });
    });

    it('should correctly return geometries after a new column was added', () => {
      const prev = [{ name: 'a' }, { name: 'b' }];
      const next = [{ name: 'a' }, { name: 'c' }, { name: 'b' }];

      expect(getTableColumnGeometriesChanges(prev, next, 300))
        .toEqual({
          data_a: { width: { from: 150, to: 100 } },
          data_b: { left: { from: 150, to: 200 }, width: { from: 150, to: 100 } },
          data_c: { left: { from: 150, to: 100 }, width: { from: 0, to: 100 } },
        });
    });

    it('should correctly return geometries after a new column was added after a fixed width column', () => {
      const prev = [{ name: 'a', width: 100 }, { name: 'b' }];
      const next = [{ name: 'a', width: 100 }, { name: 'c' }, { name: 'b' }];

      expect(getTableColumnGeometriesChanges(prev, next, 300))
        .toEqual({
          data_b: { left: { from: 100, to: 200 }, width: { from: 200, to: 100 } },
          data_c: { width: { from: 0, to: 100 } },
        });
    });
  });
});
