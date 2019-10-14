import { TABLE_HEADING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  isHeadingTableCell,
  isHeadingTableRow,
  splitHeaderColumnChains,
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

  describe('#getNextColumnName', () => {
    it('should work', () => {
      const tableColumns = [
        { key: 'a', column: { name: 'a' } },
        { key: 'b', column: { name: 'b' } },
        { key: 'c', column: { name: 'c' } },
      ];

      expect(getNextColumnName(tableColumns, 'a')).toMatch('b');
      expect(getNextColumnName(tableColumns, 'b')).toMatch('c');
      expect(getNextColumnName(tableColumns, 'c')).toBeUndefined();
    });

    it('should return undefined for no data columns', () => {
      const tableColumns = [
        { key: 'a', column: { name: 'a' } },
        { key: 'b' },
        { key: 'd', column: { name: 'c' } },
        { key: 'e', column: { name: 'd' } },
        { key: 'f' },
      ];

      expect(getNextColumnName(tableColumns, 'a')).toBeUndefined();
      expect(getNextColumnName(tableColumns, 'b')).toBeUndefined();
      expect(getNextColumnName(tableColumns, 'c')).toMatch('d');
      expect(getNextColumnName(tableColumns, 'd')).toBeUndefined();
      expect(getNextColumnName(tableColumns, 'e')).toBeUndefined();
    });
  });
});
