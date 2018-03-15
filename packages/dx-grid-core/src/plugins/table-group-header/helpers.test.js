import { TABLE_BAND_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  isBandedTableRow,
  isBandedTableCell,
  getColumnMeta,
} from './helpers';

describe('TableGroupHeader Plugin helpers', () => {
  describe('#isHeadingTableCell', () => {
    it('should work', () => {
      expect(isBandedTableCell({ type: TABLE_BAND_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isBandedTableCell({ type: TABLE_BAND_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isBandedTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isBandedTableRow', () => {
    it('should work', () => {
      expect(isBandedTableRow({ type: TABLE_BAND_TYPE }))
        .toBeTruthy();
      expect(isBandedTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#getColumnMeta', () => {
    const bandColumns = [
      {
        title: 'A',
        nested: [
          {
            title: 'AA',
            nested: [
              { columnName: 'a' },
              { columnName: 'b' },
            ],
          },
          { columnName: 'd' },
        ],
      },
    ];
    it('should get column meta if one nested levels', () => {
      expect(getColumnMeta('d', bandColumns, 1))
        .toEqual({ title: 'A', level: 1 });
    });

    it('should get column meta if two nested levels', () => {
      expect(getColumnMeta('a', bandColumns, 2))
        .toEqual({ title: 'AA', level: 2 });
    });
  });
});
