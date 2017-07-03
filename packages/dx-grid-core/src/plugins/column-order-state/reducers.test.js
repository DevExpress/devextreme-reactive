import {
    setColumnOrder,
} from './reducers';

describe('ColumnOrderState reducers', () => {
  describe('#setColumnOrder', () => {
    it('should work', () => {
      const order = ['a', 'b', 'c'];
      const payload = { sourceColumnName: 'a', targetColumnName: 'b' };

      const nextOrder = setColumnOrder(order, payload);
      expect(nextOrder).toEqual(['b', 'a', 'c']);
    });

    it('should create order copy before processing', () => {
      const order = ['a', 'b', 'c'];

      Object.defineProperty(order, 'slice', {
        value: () => order,
      });

      const computed = setColumnOrder(order, { sourceColumnName: 'a', targetColumnName: 'b' });

      expect(computed.slice()).not.toBe(order);
    });
  });
});
