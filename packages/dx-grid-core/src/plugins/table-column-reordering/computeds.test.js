import Immutable from 'seamless-immutable';

import {
  orderedColumns,
} from './computeds';

describe('TableColumnReordering computeds', () => {
  describe('#orderedColumns', () => {
    it('should return columns in the order specified', () => {
      const tableColumns = [
        { column: { name: 'a' } },
        { column: { name: 'b', payload: {} } },
        { column: { name: 'c' } },
      ];
      const order = ['b', 'a', 'c'];

      const computed = orderedColumns(tableColumns, order);
      expect(computed)
        .toEqual([
          { column: { name: 'b', payload: {} } },
          { column: { name: 'a' } },
          { column: { name: 'c' } },
        ]);
      expect(computed === tableColumns)
        .toBeFalsy();
    });

    it('should work with immutable columns', () => {
      const tableColumns = Immutable([
        { column: { name: 'a' } },
        { column: { name: 'b' } },
      ]);
      const order = ['b', 'a'];

      const computed = orderedColumns(tableColumns, order);

      expect(computed).toEqual([
        { column: { name: 'b' } },
        { column: { name: 'a' } },
      ]);
    });
  });
});
