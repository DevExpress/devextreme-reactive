// tslint:disable-next-line: import-name
import Immutable from 'seamless-immutable';
import { changeColumnOrder } from './reducers';

describe('TableColumnReordering reducers', () => {
  describe('#changeColumnOrder', () => {
    const order = ['a', 'b', 'c'];
    const payload = { sourceColumnName: 'a', targetColumnName: 'b' };

    it('should work', () => {
      const nextOrder = changeColumnOrder(order, payload);

      expect(nextOrder).toEqual(['b', 'a', 'c']);
    });

    it('should work', () => {
      expect(() => changeColumnOrder(Immutable(order), payload)).not.toThrow();
    });
  });
});
