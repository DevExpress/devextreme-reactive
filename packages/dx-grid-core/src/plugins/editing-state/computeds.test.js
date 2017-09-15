import {
  changedRowsByIds,
  addedRowsByIds,
  computedCreateRowChange,
} from './computeds';

describe('EditingState computeds', () => {
  describe('#changedRowsByIds', () => {
    it('should work', () => {
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
    it('should work', () => {
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
  describe('#computedCreateRowChange', () => {
    it('should create a row change', () => {
      const rows = [
        { a: 1, b: 1 },
        { a: 2, b: 2 },
      ];
      const columns = [
        { name: 'a' },
        { name: 'b' },
      ];
      const createRowChange = computedCreateRowChange(columns);
      const change = createRowChange(rows[1], columns[1].name, 3);

      expect(change).toEqual({ b: 3 });
    });

    it('should create a row change by using a custom function within column config', () => {
      const rows = [{ a: 1 }];
      const createRowChangeMock = jest.fn();
      const columns = [{ name: 'a', createRowChange: createRowChangeMock }];

      const createRowChange = computedCreateRowChange(columns);
      createRowChange(rows[0], columns[0].name, 3);

      expect(createRowChangeMock).toBeCalledWith(rows[0], 3, columns[0].name);
    });
  });
});
