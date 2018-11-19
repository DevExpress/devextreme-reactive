import { TABLE_HEADING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  isHeadingTableCell,
  isHeadingTableRow,
  insertFirstColumnToChains,
  splitHeaderColumnChains,
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

  describe('#insertFirstColumnToChains', () => {
    const columns = [
      { key: 'a' },
      { key: 'b' },
      { key: 'c' },
    ];
    const newColumn = { key: 'new_column' };
    const columnsWithNew = [
      newColumn,
      ...columns,
    ];
    const existingChains = [
      [
        { start: 0, columns: [columns.slice(0, 1)] },
        { start: 1, columns: [columns.slice(1)] },
      ],
      [
        { start: 0, columns: [columns.slice(0, 2)] },
        { start: 2, columns: [columns.slice(2)] },
      ],
    ];

    it('should add a chain with new column', () => {
      const chains = insertFirstColumnToChains(
        existingChains, columnsWithNew,
      );

      expect(chains).toHaveLength(2);
      expect(chains[0]).toHaveLength(3);
      expect(chains[0][0].columns).toEqual([newColumn]);
      expect(chains[0][1].columns).toEqual(existingChains[0][0].columns);
      expect(chains[0][2].columns).toEqual(existingChains[0][1].columns);
      expect(chains[1][0].columns).toEqual([newColumn]);
      expect(chains[1][1].columns).toEqual(existingChains[1][0].columns);
      expect(chains[1][2].columns).toEqual(existingChains[1][1].columns);
    });

    it('should shift start for all chains', () => {
      const chains = insertFirstColumnToChains(
        existingChains, columnsWithNew,
      );

      expect(chains[0]).toMatchObject([
        { start: 0 },
        { start: 1 },
        { start: 2 },
      ]);
      expect(chains[1]).toMatchObject([
        { start: 0 },
        { start: 1 },
        { start: 3 },
      ]);
    });
  });

  describe('#splitHeaderColumnChains', () => {
    it('should work', () => {
      const columns = [
        { key: 'a0' }, { key: 'a1' }, { key: 'b0' }, { key: 'b1' },
      ];
      const existingChains = [
        [{ start: 0, columns }],
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
});
