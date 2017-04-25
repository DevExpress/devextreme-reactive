import {
    getRowChange,
    newRowsAsChangeSet,
    changedRowsAsChangeSet,
    deletedRowsAsChangeSet,
} from './helpers';

describe('EditingState helpers', () => {
  describe('#getRowChange', () => {
    test('should work', () => {
      const changed = {
        o1: { a: 1 },
        o2: { b: 1 },
      };
      const rowId = 'o2';

      const value = getRowChange(changed, rowId);
      expect(value).toEqual({ b: 1 });
    });
  });
  describe('#newRowsAsChangeSet', () => {
    test('should work', () => {
      const newRows = [{ a: 1 }];

      const value = newRowsAsChangeSet(newRows);
      expect(value).toEqual([{
        type: 'create',
        row: { a: 1 },
      }]);
    });
  });
  describe('#changedRowsAsChangeSet', () => {
    test('should work', () => {
      const changed = { o1: { a: 1 } };

      const value = changedRowsAsChangeSet(changed);
      expect(value).toEqual([{
        type: 'update',
        rowId: 'o1',
        change: { a: 1 },
      }]);
    });
  });
  describe('#deletedRowsAsChangeSet', () => {
    test('should work', () => {
      const deleted = [1];

      const value = deletedRowsAsChangeSet(deleted);
      expect(value).toEqual([{
        type: 'delete',
        rowId: 1,
      }]);
    });
  });
});
