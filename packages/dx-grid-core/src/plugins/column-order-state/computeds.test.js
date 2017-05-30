import {
    applyColumnOrder,
} from './computeds';

describe('ColumnOrderState computeds', () => {
  describe('#applyColumnOrder', () => {
    test('should work', () => {
      const columns = [{ name: 'a' }, { name: 'b', payload: {} }, { name: 'c' }];
      const order = ['b', 'a', 'c'];

      const computed = applyColumnOrder(columns, order);
      expect(computed).toEqual([{ name: 'b', payload: {} }, { name: 'a' }, { name: 'c' }]);
    });
  });
});
