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
      expect(createRowChangeGetter(undefined)({ a: 1 }, 2, 'a'))
        .toEqual({ a: 2 });
      expect(createRowChangeGetter(undefined)({ b: 2 }, 1, 'a'))
        .toEqual({ a: 1 });
    });

    it('should work with columnExtension defined cell access', () => {
      const columnExtensions = [{
        columnName: 'a',
        createRowChange: (row, value, columnName) => ({ [`_${columnName}`]: value }),
      }];

      expect(createRowChangeGetter(undefined, columnExtensions)({ a: 1 }, 2, 'a'))
        .toEqual({ _a: 2 });
      expect(createRowChangeGetter(undefined, columnExtensions)({ b: 2 }, 1, 'a'))
        .toEqual({ _a: 1 });
    });

    it('should work with defined cell access', () => {
      const createRowChange = (row, value, columnName) => ({ [`_${columnName}`]: value });

      expect(createRowChangeGetter(createRowChange)({ a: 1 }, 2, 'a'))
        .toEqual({ _a: 2 });
      expect(createRowChangeGetter(createRowChange)({ b: 2 }, 1, 'a'))
        .toEqual({ _a: 1 });
    });
  });
});
