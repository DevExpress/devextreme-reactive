import { TABLE_DATA_TYPE } from '../table/constants';
import { isTreeTableCell } from './helpers';

describe('TableTreeColumn Plugin helpers', () => {
  describe('#isTreeTableCell', () => {
    it('should work', () => {
      expect(isTreeTableCell(
        { type: TABLE_DATA_TYPE },
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        'a',
      ))
        .toBeTruthy();
      expect(isTreeTableCell(
        { type: TABLE_DATA_TYPE },
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        'b',
      ))
        .toBeFalsy();
      expect(isTreeTableCell(
        { type: TABLE_DATA_TYPE },
        { type: 'undefined', column: { name: 'a' } },
      ))
        .toBeFalsy();
      expect(isTreeTableCell(
        { type: 'undefined' },
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
      ))
        .toBeFalsy();
    });
  });
});
