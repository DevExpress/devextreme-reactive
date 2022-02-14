import {
  getTableColumnGeometries,
  getTableTargetColumnIndex,
  getAnimations,
} from './table';

describe('table utils', () => {
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

      expect(getTableTargetColumnIndex(columnGeometries, 40)).toEqual(0);
      expect(getTableTargetColumnIndex(columnGeometries, 120)).toEqual(1);
      expect(getTableTargetColumnIndex(columnGeometries, 190)).toEqual(2);
      expect(getTableTargetColumnIndex(columnGeometries, 260)).toEqual(3);
    });

    it('should correctly return index with fixed columns', () => {
      const columnGeometries = [
        { left: 0, right: 150 },
        { left: 150, right: 300 },
        { left: 100, right: 200, isFixed: true },
        { left: 200, right: 300, isFixed: true },
        { left: 300, right: 450 },
        { left: 450, right: 600 },
      ];

      expect(getTableTargetColumnIndex(columnGeometries, 50)).toEqual(0);
      expect(getTableTargetColumnIndex(columnGeometries, 120)).toEqual(2);
      expect(getTableTargetColumnIndex(columnGeometries, 170)).toEqual(2);
      expect(getTableTargetColumnIndex(columnGeometries, 250)).toEqual(3);
      expect(getTableTargetColumnIndex(columnGeometries, 320)).toEqual(4);
    });

    it('should correctly return index, virtual table', () => {
      const columnGeometries = [
        { left: 0, right: 150, isFixed: true },
        { left: 150, right: 300, isFixed: true },
        { left: -300, right: -150 },
        { left: -150, right: -0 },
        { left: 0, right: 0 },
        { left: 0, right: 200 },
        { left: 200, right: 300 },
        { left: 300, right: 450 },
        { left: 450, right: 600 },
      ];

      expect(getTableTargetColumnIndex(columnGeometries, 50)).toEqual(-1);
      expect(getTableTargetColumnIndex(columnGeometries, 0)).toEqual(-1);
      expect(getTableTargetColumnIndex(columnGeometries, 150)).toEqual(-1);
    });
  });

  describe('#getAnimations', () => {
    it('should not fail with different set of columns', () => {
      expect(() => {
        getAnimations([{ key: 'a' }], [{ key: 'b' }], 400, new Map());
      })
        .not.toThrow();
    });

    it('should return correct animations', () => {
      expect(getAnimations([{ key: 'b' }], [{ key: 'a' }, { key: 'b' }], 400, new Map()).get('b'))
        .toMatchObject({ left: { from: 0, to: 200 } });
    });

    it('should not start animation for resizing', () => {
      expect(getAnimations(
          [{ key: 'a', width: 100 }, { key: 'b' }],
          [{ key: 'a', width: 120 }, { key: 'b' }],
          400,
          new Map()))
        .toEqual(new Map());
    });
  });
});
