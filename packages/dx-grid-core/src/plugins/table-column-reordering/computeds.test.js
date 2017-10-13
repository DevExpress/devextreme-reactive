import Immutable from 'seamless-immutable';
import { TABLE_DATA_TYPE } from '../table-view/constants';
import { orderedColumns } from './computeds';

describe('TableColumnReordering computeds', () => {
  describe('#orderedColumns', () => {
    it('should return columns in the order specified', () => {
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b', payload: {} } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      ];
      const order = ['b', 'a', 'c'];

      const computed = orderedColumns(tableColumns, order);
      expect(computed)
        .toEqual([
          { type: TABLE_DATA_TYPE, column: { name: 'b', payload: {} } },
          { type: TABLE_DATA_TYPE, column: { name: 'a' } },
          { type: TABLE_DATA_TYPE, column: { name: 'c' } },
        ]);
      expect(computed === tableColumns)
        .toBeFalsy();
    });

    it('should work with immutable columns', () => {
      const tableColumns = Immutable([
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
      ]);

      expect(orderedColumns(tableColumns, ['b', 'a']))
        .toEqual([
          { type: TABLE_DATA_TYPE, column: { name: 'b' } },
          { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        ]);
    });

    it('should work correctly with non-data columns', () => {
      const tableColumns = [
        { type: 'test', column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      ];

      expect(orderedColumns(tableColumns, ['c', 'a', 'b']))
        .toEqual([
          { type: 'test', column: { name: 'a' } },
          { type: TABLE_DATA_TYPE, column: { name: 'c' } },
          { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        ]);
    });
  });
});
