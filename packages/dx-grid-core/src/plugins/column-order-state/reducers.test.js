import Immutable from 'seamless-immutable';

import {
    setColumnOrder,
} from './reducers';

describe('ColumnOrderState reducers', () => {
  describe('#setColumnOrder', () => {
    const order = ['a', 'b', 'c'];
    const payload = { sourceColumnName: 'a', targetColumnName: 'b' };

    it('should work', () => {
      const nextOrder = setColumnOrder(order, payload);

      expect(nextOrder).toEqual(['b', 'a', 'c']);
    });

    it('should work with immutable order', () => {
      const nextOrder = setColumnOrder(Immutable(order), payload);

      expect(nextOrder).toEqual(['b', 'a', 'c']);
    });
  });
});
