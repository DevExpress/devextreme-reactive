import { TABLE_HEADING_TYPE } from './constants';
import {
  tableRowsWithHeading,
  tableHeaderColumnChainsWithHeading,
} from './computeds';

describe('TableHeaderRow Plugin computeds', () => {
  describe('#tableRowsWithHeading', () => {
    it('should work', () => {
      const rows = tableRowsWithHeading([{}]);

      expect(rows)
        .toEqual([{ key: TABLE_HEADING_TYPE.toString(), type: TABLE_HEADING_TYPE }, {}]);
    });
  });

  describe('#tableHeaderColumnChainsWithHeading', () => {
    const rows = [
      { key: 'heading_key0', type: TABLE_HEADING_TYPE },
      { key: 'heading_key1', type: TABLE_HEADING_TYPE },
      { key: 'other_key', type: 'other' },
    ];
    const columns = [{}, {}];

    it('should extend existing chains', () => {
      const existingChains = [
        [{ start: 0, columns: [] }],
      ];

      const chains = tableHeaderColumnChainsWithHeading(
        existingChains, rows, columns,
      );

      expect(chains).toHaveLength(3);
      expect(chains[2]).toBe(existingChains[0]);
    });

    it('should map over heading rows only', () => {
      const chains = tableHeaderColumnChainsWithHeading(
        [], rows, columns,
      );

      expect(chains).toHaveLength(2);
    });

    it('should set correct start and columns', () => {
      const chains = tableHeaderColumnChainsWithHeading(
        [], rows, columns,
      );
      const expected = [{
        start: 0,
        columns,
      }];

      expect(chains[0]).toMatchObject(expected);
      expect(chains[1]).toMatchObject(expected);
    });
  });
});
