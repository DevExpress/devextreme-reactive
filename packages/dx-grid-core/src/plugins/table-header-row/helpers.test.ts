import { TABLE_HEADING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  isHeadingTableCell,
  isHeadingTableRow,
  splitHeaderColumnChains,
  getLastColumnName,
  getNextColumnName,
} from './helpers';

describe('TableHeaderRow Plugin helpers', () => {
  describe('#isHeadingTableCell', () => {
    it('should work', () => {
      expect(isHeadingTableCell({ type: TABLE_HEADING_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isHeadingTableCell({ type: TABLE_HEADING_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isHeadingTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });
  describe('#isHeadingTableRow', () => {
    it('should work', () => {
      expect(isHeadingTableRow({ type: TABLE_HEADING_TYPE }))
        .toBeTruthy();
      expect(isHeadingTableRow({ type: 'undefined' }))
        .toBeFalsy();
    });
  });

  describe('#splitHeaderColumnChains', () => {
    it('should work', () => {
      const columns = [
        { key: 'a0' }, { key: 'a1' }, { key: 'b0' }, { key: 'b1' },
      ];
      const existingChains = [
        [{ columns, start: 0 }],
      ];
      const shouldSplitChain = (currentChain, column) => (
        !currentChain || column.key.indexOf('b') > -1
      );
      const extendChainProps = () => ({
        extended: true,
      });

      const chains = splitHeaderColumnChains(
        existingChains, columns, shouldSplitChain, extendChainProps,
      );

      expect(chains[0]).toHaveLength(3);
      expect(chains[0]).toMatchObject([
        { start: 0, extended: true, columns: columns.slice(0, 2) },
        { start: 2, extended: true, columns: columns.slice(2, 3) },
        { start: 3, extended: true, columns: columns.slice(3, 4) },
      ]);
    });
  });

  describe('#getLastColumnName', () => {
    it('should work', () => {
      const tableColumns = [
        { column: { name: 'a' }, type: TABLE_DATA_TYPE },
        { column: { name: 'b' }, type: TABLE_DATA_TYPE },
        { column: { name: 'c' }, type: TABLE_DATA_TYPE },
      ];

      expect(getLastColumnName(tableColumns)).toMatch('c');
      expect(getLastColumnName([])).toBeUndefined();
    });
  });

  describe('#getNextColumnName', () => {
    it('should work', () => {
      const tableColumns = [
        { column: { name: 'a' }, type: TABLE_DATA_TYPE },
        { column: { name: 'b' }, type: TABLE_DATA_TYPE },
        { column: { name: 'c' }, type: TABLE_DATA_TYPE },
      ];

      expect(getNextColumnName(tableColumns, 'a')).toMatch('b');
      expect(getNextColumnName(tableColumns, 'b')).toMatch('c');
      expect(getNextColumnName(tableColumns, 'c')).toBeUndefined();
    });
  });
});
