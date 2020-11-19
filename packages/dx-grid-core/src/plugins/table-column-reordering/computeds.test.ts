// tslint:disable-next-line: import-name
import Immutable from 'seamless-immutable';
import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_REORDERING_TYPE } from './constants';
import {
  orderedColumns,
  tableHeaderRowsWithReordering,
  draftOrder,
} from './computeds';

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

    it('should order a large number of columns correctly', () => {
      const tableColumns = [
        { type: 'test', column: { name: 'z' } },
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
        { type: TABLE_DATA_TYPE, column: { name: 'd' } },
        { type: TABLE_DATA_TYPE, column: { name: 'e' } },
        { type: TABLE_DATA_TYPE, column: { name: 'f' } },
        { type: TABLE_DATA_TYPE, column: { name: 'g' } },
        { type: TABLE_DATA_TYPE, column: { name: 'i' } },
        { type: TABLE_DATA_TYPE, column: { name: 'j' } },
        { type: TABLE_DATA_TYPE, column: { name: 'k' } },
      ];
      const order = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'z'];

      expect(orderedColumns(tableColumns, order))
        .toEqual(tableColumns);
    });
  });

  describe('#tableHeaderRowsWithReordering', () => {
    it('should add a reordering row to the rows passed', () => {
      expect(tableHeaderRowsWithReordering([]))
        .toEqual([{
          key: TABLE_REORDERING_TYPE.toString(),
          type: TABLE_REORDERING_TYPE,
          height: 0,
        }]);
    });
  });

  describe('#draftOrder', () => {
    const columns = [
      { type: TABLE_DATA_TYPE, column: { name: 'a' } },
      { type: TABLE_DATA_TYPE, column: { name: 'b' } },
      { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      { type: TABLE_DATA_TYPE, column: { name: 'd' } },
    ];
    it('should return reordered columns', () => {
      expect(draftOrder(columns, 1, 3))
        .toEqual([
          { type: TABLE_DATA_TYPE, column: { name: 'a' } },
          { type: TABLE_DATA_TYPE, column: { name: 'c' } },
          { type: TABLE_DATA_TYPE, column: { name: 'd' } },
          { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        ]);
    });

    it('should return the array passed if no changes are possible', () => {
      expect(draftOrder(columns, -1, -1))
        .toBe(columns);
      expect(draftOrder(columns, -1, 1))
        .toBe(columns);
      expect(draftOrder(columns, 1, 1))
        .toBe(columns);
    });

    it('should work with immutable properties', () => {
      expect(() => draftOrder(Immutable(columns), 1, 3)).not.toThrow();
    });
  });
});
