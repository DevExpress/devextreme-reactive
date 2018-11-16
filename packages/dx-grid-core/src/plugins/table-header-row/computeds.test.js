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
    it('should return basic chain for heading row', () => {
      const columns = [{}, {}];
      const rows = [
        { key: 'row1', type: TABLE_HEADING_TYPE },
        { key: 'row2' },
      ];
      const existingChains = [{ columns: [] }];

      const chains = tableHeaderColumnChainsWithHeading(existingChains, rows, columns);

      expect(chains).toHaveLength(2);
      expect(chains[0]).toHaveLength(1);
      expect(chains[0][0].columns).toBe(columns);
      expect(chains[0][0].start).toBe(0);
      expect(chains[1]).toBe(existingChains[0]);
    });
  });
});
