import {
    changedRowsByIds,
    addedRowsByIds,
} from './computeds';

describe('EditingState computeds', () => {
  describe('#changedRowsByIds', () => {
    test('should work', () => {
      const changed = {
        o1: { a: 1 },
        o2: { b: 1 },
      };
      const rowIds = ['o2'];

      const computed = changedRowsByIds(changed, rowIds);
      expect(computed).toEqual({
        o2: { b: 1 },
      });
    });
  });
  describe('#addedRowsByIds', () => {
    test('should work', () => {
      const addedRows = [
        { a: 1 },
        { b: 1 },
        { c: 1 },
      ];
      const indexes = [1];

      const computed = addedRowsByIds(addedRows, indexes);
      expect(computed).toEqual([
        { b: 1 },
      ]);
    });
  });
});
