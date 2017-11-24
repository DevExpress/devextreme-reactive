import {
  getAvailableToSelect,
  isSomeSelected,
  isAllSelected,
} from './computeds';

describe('LocalSelection computeds', () => {
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
      expect(isSomeSelected({ selection: [], availableToSelect: [] })).toBeFalsy();
      expect(isSomeSelected({ selection: [], availableToSelect: [1] })).toBeFalsy();
      expect(isSomeSelected({ selection: [1], availableToSelect: [] })).toBeFalsy();
    });
    it('should work when all available rows consist in selection rows', () => {
      expect(isSomeSelected({ selection: [1, 2], availableToSelect: [1] })).toBeFalsy();
      expect(isSomeSelected({ selection: [1, 2], availableToSelect: [1, 3] })).toBeTruthy();
    });
    it('should work when selection rows consist in available rows', () => {
      expect(isSomeSelected({ selection: [1], availableToSelect: [1, 2] })).toBeTruthy();
      expect(isSomeSelected({ selection: [1], availableToSelect: [2] })).toBeFalsy();
    });
  });
  describe('#isAllSelected', () => {
    it('should work with simple scenarios', () => {
      expect(isAllSelected({ selection: [], availableToSelect: [] })).toBeFalsy();
      expect(isAllSelected({ selection: [1], availableToSelect: [] })).toBeFalsy();
      expect(isAllSelected({ selection: [], availableToSelect: [1] })).toBeFalsy();
    });
    it('should work when all available rows consist in selection rows', () => {
      expect(isAllSelected({ selection: [1, 2, 3], availableToSelect: [2, 3] })).toBeTruthy();
      expect(isAllSelected({ selection: [1, 2, 3], availableToSelect: [2, 3, 4] })).toBeFalsy();
    });
  });
});
