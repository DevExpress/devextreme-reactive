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
  });
});
