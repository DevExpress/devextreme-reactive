import {
    orderedColumns,
} from './computeds';

describe('ColumnOrderState computeds', () => {
  describe('#orderedColumns', () => {
    it('should return columns in the order specified', () => {
      const columns = [{ name: 'a' }, { name: 'b', payload: {} }, { name: 'c' }];
      const order = ['b', 'a', 'c'];

      const computed = orderedColumns(columns, order);
      expect(computed)
        .toEqual([{ name: 'b', payload: {} }, { name: 'a' }, { name: 'c' }]);
      expect(computed === columns)
        .toBeFalsy();
    });

    it('should create columns copy before processing', () => {
      const columns = [{ name: 'a' }];

      Object.defineProperty(columns, 'slice', {
        value: () => columns,
      });

      const computed = orderedColumns(columns, ['a']);

      expect(computed.slice()).not.toBe(columns);
    });
  });
});
