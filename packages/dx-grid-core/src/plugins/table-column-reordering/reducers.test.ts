import { changeColumnOrder } from './reducers';

describe('TableColumnReordering reducers', () => {
  describe('#changeColumnOrder', () => {
    const order = ['a', 'b', 'c'];
    const payload = { sourceColumnName: 'a', targetColumnName: 'b' };

    it('should work', () => {
      const nextOrder = changeColumnOrder(order, payload);

      expect(nextOrder).toEqual(['b', 'a', 'c']);
    });
  });
});
