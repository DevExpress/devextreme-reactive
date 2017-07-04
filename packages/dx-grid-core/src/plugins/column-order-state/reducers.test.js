import Immutable from 'seamless-immutable';

import {
    setColumnOrder,
} from './reducers';

describe('ColumnOrderState reducers', () => {
  describe('#setColumnOrder', () => {
    const order = ['a', 'b', 'c'];
    const payload = { sourceColumnName: 'a', targetColumnName: 'b' };
    const setUpOrder = useImmutable => (useImmutable ? Immutable(order) : order);

    it('should work', () => {
      const nextOrder = setColumnOrder(setUpOrder(), payload);

      expect(nextOrder).toEqual(['b', 'a', 'c']);
    });

    it('should work with immutable order', () => {
      const nextOrder = setColumnOrder(setUpOrder(true), payload);

      expect(nextOrder).toEqual(['b', 'a', 'c']);
    });
  });
});
