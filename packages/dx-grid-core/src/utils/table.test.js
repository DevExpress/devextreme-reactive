import {
  getTableColumnGeometries,
  getTableTargetColumnIndex,
  getTableRowColumnsWithColSpan,
  getAnimations,
} from './table';

describe('table utils', () => {
  describe('#getTableRowColumnsWithColSpan', () => {
    it('should return correct columns without colSpan', () => {
      const columns = [{ type: 'a', id: 1 }, { type: 'b', id: 2 }];

      expect(getTableRowColumnsWithColSpan(columns, null))
        .toEqual(columns);
    });

    it('should return correct columns with numeric colSpan', () => {
      const columns = [{ type: 'a', id: 1 }, { type: 'b', id: 2 }, { type: 'c', id: 3 }];

      expect(getTableRowColumnsWithColSpan(columns, 0))
        .toEqual([{ ...columns[0], colSpan: 3 }]);

      expect(getTableRowColumnsWithColSpan(columns, 1))
        .toEqual([columns[0], { ...columns[1], colSpan: 2 }]);
    });

    it('should return correct columns with string colSpan', () => {
      const columns = [{ key: 'a_1' }, { key: 'b_2' }, { key: 'c_3' }];

      expect(getTableRowColumnsWithColSpan(columns, 'a_1'))
        .toEqual([{ ...columns[0], colSpan: 3 }]);

      expect(getTableRowColumnsWithColSpan(columns, 'b_2'))
        .toEqual([columns[0], { ...columns[1], colSpan: 2 }]);
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

  describe('#getAnimations', () => {
    it('should not return animations if columns are the same', () => {
      expect(getAnimations(
        [{ key: 'a', width: 100 }, { key: 'b' }],
        [{ key: 'a', width: 200 }, { key: 'b' }],
        1000,
        new Map(),
      )).toEqual(new Map());
    });
  });
});
