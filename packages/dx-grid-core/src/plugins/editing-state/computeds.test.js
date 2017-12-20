import {
  changedRowsByIds,
  addedRowsByIds,
  createRowChangeGetter,
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
  describe('#createRowChangeGetter', () => {
    it('should work with default cell access', () => {
      const columnExtensions = undefined;
      const createRowChange = null;

      expect(createRowChangeGetter(createRowChange, columnExtensions)({ a: 1 }, 'a', 2))
        .toEqual({ a: 2 });
      expect(createRowChangeGetter(createRowChange, columnExtensions)({ b: 2 }, 'a', 1))
        .toEqual({ a: 1 });
    });

    it('should work with columnExtension defined cell access', () => {
      const columnExtensions = [{
        columnName: 'a',
        createRowChange: (row, value, columnName) => ({ [`_${columnName}`]: value }),
      }];
      const createRowChange = null;

      expect(createRowChangeGetter(createRowChange, columnExtensions)({ a: 1 }, 'a', 2))
        .toEqual({ _a: 2 });
      expect(createRowChangeGetter(createRowChange, columnExtensions)({ b: 2 }, 'a', 1))
        .toEqual({ _a: 1 });
    });

    it('should work with defined cell access', () => {
      const columnExtensions = undefined;
      const createRowChange = (row, columnName, value) => ({ [`_${columnName}`]: value });

      expect(createRowChangeGetter(createRowChange, columnExtensions)({ a: 1 }, 'a', 2))
        .toEqual({ _a: 2 });
      expect(createRowChangeGetter(createRowChange, columnExtensions)({ b: 2 }, 'a', 1))
        .toEqual({ _a: 1 });
    });
  });
});
