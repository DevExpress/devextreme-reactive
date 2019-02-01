import { getGroupCellTargetIndex } from './group-panel';

describe('GroupPanel utils', () => {
  describe('#getGroupCellTargetIndex', () => {
    it('should return target index correctly when moving an element within the same line', () => {
      const geometries = [
        {
          top: 0, right: 100, bottom: 40, left: 0,
        },
        {
          top: 0, right: 250, bottom: 40, left: 100,
        },
        {
          top: 0, right: 350, bottom: 40, left: 250,
        },
      ];

      expect(getGroupCellTargetIndex(geometries, 2, { x: 120, y: 20 }))
        .toBe(1);

      expect(getGroupCellTargetIndex(geometries, 2, { x: 220, y: 20 }))
        .toBe(2);
    });

    it('should return target index correctly when moving an element within multiple lines', () => {
      const geometries = [
        {
          top: 0, right: 100, bottom: 40, left: 0,
        },
        {
          top: 0, right: 250, bottom: 40, left: 100,
        },
        {
          top: 50, right: 100, bottom: 90, left: 0,
        },
        {
          top: 50, right: 300, bottom: 90, left: 100,
        },
      ];

      expect(getGroupCellTargetIndex(geometries, 2, { x: 170, y: 20 }))
        .toBe(1);

      expect(getGroupCellTargetIndex(geometries, 2, { x: 220, y: 20 }))
        .toBe(2);
    });

    it('should return target index correctly when there are no initial geometries', () => {
      expect(getGroupCellTargetIndex([], undefined, { x: 10, y: 10 }))
        .toBe(0);
    });

// tslint:disable-next-line: max-line-length
    it('should return target index correctly for a new group when all elements are on the same line', () => {
      const geometries = [
        {
          top: 0, right: 100, bottom: 40, left: 20,
        },
        {
          top: 0, right: 250, bottom: 40, left: 100,
        },
        {
          top: 0, right: 300, bottom: 40, left: 250,
        },
      ];

      expect(getGroupCellTargetIndex(geometries, -1, { x: 150, y: 20 }))
        .toBe(1);

      expect(getGroupCellTargetIndex(geometries, -1, { x: 500, y: 20 }))
        .toBe(3);

      expect(getGroupCellTargetIndex(geometries, -1, { x: 0, y: 20 }))
        .toBe(0);
    });

// tslint:disable-next-line: max-line-length
    it('should return target index correctly for a new group when elements are on multiple lines', () => {
      const geometries = [
        {
          top: 0, right: 100, bottom: 40, left: 0,
        },
        {
          top: 0, right: 250, bottom: 40, left: 100,
        },
        {
          top: 50, right: 100, bottom: 90, left: 0,
        },
        {
          top: 50, right: 300, bottom: 90, left: 100,
        },
      ];

      expect(getGroupCellTargetIndex(geometries, -1, { x: 50, y: 70 }))
        .toBe(2);

      expect(getGroupCellTargetIndex(geometries, -1, { x: 250, y: 70 }))
        .toBe(3);

      expect(getGroupCellTargetIndex(geometries, -1, { x: 350, y: 70 }))
        .toBe(4);

      expect(getGroupCellTargetIndex(geometries, -1, { x: 300, y: 20 }))
        .toBe(2);
    });

    it('should return target index correctly if columns have indent', () => {
      const geometries = [
        {
          top: 0, right: 100, bottom: 40, left: 0,
        },
        {
          top: 0, right: 200, bottom: 40, left: 150,
        },
        {
          top: 0, right: 350, bottom: 40, left: 250,
        },
      ];

      expect(getGroupCellTargetIndex(geometries, 1, { x: 60, y: 20 }))
        .toBe(0);
    });
  });
});
