import { getGroupCellTargetIndex } from './group-panel';

describe('GroupPanel utils', () => {
  describe('#getGroupCellTargetIndex', () => {
    it('should return target index correctly when moving an element within the same line', () => {
      const geometries = [
        { top: 0, right: 100, bottom: 40, left: 0 },
        { top: 0, right: 250, bottom: 40, left: 100 },
        { top: 0, right: 350, bottom: 40, left: 250 },
      ];

      expect(getGroupCellTargetIndex(geometries, 2, { x: 120, y: 20 }))
        .toBe(1);

      expect(getGroupCellTargetIndex(geometries, 2, { x: 220, y: 20 }))
        .toBe(2);
    });

    it('should return target index correctly when moving an element within multiple lines', () => {
      const geometries = [
        { top: 0, right: 100, bottom: 40, left: 0 },
        { top: 0, right: 250, bottom: 40, left: 100 },
        { top: 50, right: 100, bottom: 90, left: 0 },
        { top: 50, right: 300, bottom: 90, left: 100 },
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
  });
});
