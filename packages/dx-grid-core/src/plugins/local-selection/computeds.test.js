import {
  getAvailableToSelect,
  someSelected,
  allSelected,
} from './computeds';

describe('IntegratedSelection computeds', () => {
  const selectionNone = new Set([]);
  const selectionOne = new Set([1]);
  const selectionTwo = new Set([1, 2]);
  const selectionThree = new Set([1, 2, 3]);
  describe('#getAvailableToSelect', () => {
    it('should work', () => {
      const rows = [
        { id: 1 },
        { id: 2, group: true },
        { id: 3 },
      ];
      const getRowId = row => row.id;

      expect(getAvailableToSelect(rows, getRowId))
        .toEqual([1, 2, 3]);
    });

    it('should work with grouping', () => {
      const rows = [
        { id: 1, group: true },
        { id: 2 },
      ];
      const getRowId = row => row.id;
      const isGroupRow = row => row.group;

      expect(getAvailableToSelect(rows, getRowId, isGroupRow))
        .toEqual([2]);
    });
  });
  describe('#someSelected', () => {
    it('should work with simple scenarios', () => {
      expect(someSelected({ selection: selectionNone, availableToSelect: [] })).toBeFalsy();
      expect(someSelected({ selection: selectionNone, availableToSelect: [1] })).toBeFalsy();
      expect(someSelected({ selection: selectionOne, availableToSelect: [] })).toBeFalsy();
    });
    it('should work when all available rows consist in selection rows', () => {
      expect(someSelected({ selection: selectionTwo, availableToSelect: [1] })).toBeFalsy();
      expect(someSelected({ selection: selectionTwo, availableToSelect: [1, 3] })).toBeTruthy();
    });
    it('should work when selection rows consist in available rows', () => {
      expect(someSelected({ selection: selectionOne, availableToSelect: [1, 2] })).toBeTruthy();
      expect(someSelected({ selection: selectionOne, availableToSelect: [2] })).toBeFalsy();
    });
  });
  describe('#allSelected', () => {
    it('should work with simple scenarios', () => {
      expect(allSelected({ selection: selectionNone, availableToSelect: [] })).toBeFalsy();
      expect(allSelected({ selection: selectionOne, availableToSelect: [] })).toBeFalsy();
      expect(allSelected({ selection: selectionNone, availableToSelect: [1] })).toBeFalsy();
    });
    it('should work when all available rows consist in selection rows', () => {
      expect(allSelected({
        selection: selectionThree, availableToSelect: [2, 3],
      })).toBeTruthy();
      expect(allSelected({
        selection: selectionThree, availableToSelect: [2, 3, 4],
      })).toBeFalsy();
    });
  });
});
