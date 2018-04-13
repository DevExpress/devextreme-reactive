import { adjustSortIndex } from './helpers';

describe('GroupingState helpers', () => {
  describe('#adjustSortIndex', () => {
    it('should work if group index is 0', () => {
      const grouping = [{ columnName: 'a' }];
      const sorting = [{ columnName: 'a' }];
      const sortIndex = adjustSortIndex(0, grouping, sorting);
      expect(sortIndex)
        .toBe(0);
    });
    it('should work if grouping and sorting contain the same column', () => {
      const grouping = [{ columnName: 'a' }, { columnName: 'b' }, { columnName: 'c' }];
      const sorting = [{ columnName: 'c' }];
      const sortIndex = adjustSortIndex(3, grouping, sorting);
      expect(sortIndex)
        .toBe(1);
    });
    it('should work if grouping and sorting do not contain the same column', () => {
      const grouping = [{ columnName: 'a' }];
      const sorting = [{ columnName: 'b' }];
      const sortIndex = adjustSortIndex(1, grouping, sorting);
      expect(sortIndex)
        .toBe(0);
    });
  });
});
