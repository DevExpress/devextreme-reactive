import {
  rowsWithAvailableToSelect,
  someSelected,
  allSelected,
  unwrapSelectedRows,
} from './computeds';

describe('IntegratedSelection computeds', () => {
  const selectionNone = [];
  const selectionOne = [1];
  const selectionTwo = [1, 2];
  const selectionThree = [1, 2, 3];

  describe('#rowsWithAvailableToSelect', () => {
    it('should work', () => {
      const rows = [
        { id: 1 },
        { id: 2, group: true },
        { id: 3 },
      ];
      const getRowId = row => row.id;

      expect(rowsWithAvailableToSelect(rows, getRowId))
        .toEqual({ rows, availableToSelect: [1, 2, 3] });
    });
    it('should work with grouping', () => {
      const rows = [
        { id: 1, group: true },
        { id: 2 },
      ];
      const getRowId = row => row.id;
      const isGroupRow = row => row.group;

      expect(rowsWithAvailableToSelect(rows, getRowId, isGroupRow))
        .toEqual({ rows, availableToSelect: [2] });
    });
  });

  describe('#someSelected', () => {
    it('should work with simple scenarios', () => {
      expect(someSelected({ availableToSelect: [] }, selectionNone)).toBeFalsy();
      expect(someSelected({ availableToSelect: [1] }, selectionNone)).toBeFalsy();
      expect(someSelected({ availableToSelect: [] }, selectionOne)).toBeFalsy();
    });
    it('should work when all available rows consist in selection rows', () => {
      expect(someSelected({ availableToSelect: [1] }, selectionTwo)).toBeFalsy();
      expect(someSelected({ availableToSelect: [1, 3] }, selectionTwo)).toBeTruthy();
    });
    it('should work when selection rows consist in available rows', () => {
      expect(someSelected({ availableToSelect: [1, 2] }, selectionOne)).toBeTruthy();
      expect(someSelected({ availableToSelect: [2] }, selectionOne)).toBeFalsy();
    });
  });

  describe('#allSelected', () => {
    it('should work with simple scenarios', () => {
      expect(allSelected({ availableToSelect: [] }, selectionNone)).toBeFalsy();
      expect(allSelected({ availableToSelect: [] }, selectionOne)).toBeFalsy();
      expect(allSelected({ availableToSelect: [1] }, selectionNone)).toBeFalsy();
    });
    it('should work when all available rows consist in selection rows', () => {
      expect(allSelected({ availableToSelect: [2, 3] }, selectionThree)).toBeTruthy();
      expect(allSelected({ availableToSelect: [2, 3, 4] }, selectionThree)).toBeFalsy();
    });
  });

  describe('#unwrapSelectedRows', () => {
    it('should work', () => {
      const rowsWithAvailableToSelectData = {
        rows: [
          { id: 1 },
          { id: 2, group: true },
          { id: 3 },
        ],
      };

      expect(unwrapSelectedRows(rowsWithAvailableToSelectData))
        .toBe(rowsWithAvailableToSelectData.rows);
    });
  });
});
