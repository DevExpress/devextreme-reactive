import {
  getAvailableToSelect,
  isSomeSelected,
  isAllSelected,
} from './computeds';

describe('LocalSelection computeds', () => {
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
  describe('#isSomeSelected', () => {
    it('should work with simple scenarios', () => {
      expect(isSomeSelected({ selection: selectionNone, availableToSelect: [] })).toBeFalsy();
      expect(isSomeSelected({ selection: selectionNone, availableToSelect: [1] })).toBeFalsy();
      expect(isSomeSelected({ selection: selectionOne, availableToSelect: [] })).toBeFalsy();
    });
    it('should work when all available rows consist in selection rows', () => {
      expect(isSomeSelected({ selection: selectionTwo, availableToSelect: [1] })).toBeFalsy();
      expect(isSomeSelected({ selection: selectionTwo, availableToSelect: [1, 3] })).toBeTruthy();
    });
    it('should work when selection rows consist in available rows', () => {
      expect(isSomeSelected({ selection: selectionOne, availableToSelect: [1, 2] })).toBeTruthy();
      expect(isSomeSelected({ selection: selectionOne, availableToSelect: [2] })).toBeFalsy();
    });
  });
  describe('#isAllSelected', () => {
    it('should work with simple scenarios', () => {
      expect(isAllSelected({ selection: selectionNone, availableToSelect: [] })).toBeFalsy();
      expect(isAllSelected({ selection: selectionOne, availableToSelect: [] })).toBeFalsy();
      expect(isAllSelected({ selection: selectionNone, availableToSelect: [1] })).toBeFalsy();
    });
    it('should work when all available rows consist in selection rows', () => {
      expect(isAllSelected({
        selection: selectionThree, availableToSelect: [2, 3],
      })).toBeTruthy();
      expect(isAllSelected({
        selection: selectionThree, availableToSelect: [2, 3, 4],
      })).toBeFalsy();
    });
  });
});
