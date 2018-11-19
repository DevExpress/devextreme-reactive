import { TABLE_FILTER_TYPE } from './constants';
import { tableHeaderRowsWithFilter, tableHeaderColumnChainsWithFilter } from './computeds';

describe('TableFilterRow Plugin computeds', () => {
  describe('#tableHeaderRowsWithFilter', () => {
    it('should work', () => {
      expect(tableHeaderRowsWithFilter([{}], 100))
        .toEqual([
          {},
          { key: TABLE_FILTER_TYPE.toString(), type: TABLE_FILTER_TYPE, height: 100 },
        ]);
    });
  });

  describe('#tableHeaderColumnChainsWithFilter', () => {
    const rows = [
      { key: 'other_key', type: 'other' },
      { key: 'filter_key', type: TABLE_FILTER_TYPE },
    ];
    const columns = [{}, {}];

    it('should extend existing chains', () => {
      const existingChains = [
        { start: 0, columns: [] },
        { start: 0, columns: [] },
      ];

      const chains = tableHeaderColumnChainsWithFilter(
        existingChains, rows, columns,
      );

      expect(chains).toHaveLength(3);
      expect(chains[0]).toBe(existingChains[0]);
      expect(chains[1]).toBe(existingChains[1]);
    });

    it('should map over filter rows only', () => {
      const chains = tableHeaderColumnChainsWithFilter(
        [], rows, columns,
      );

      expect(chains).toHaveLength(1);
    });

    it('should set correct start and columns', () => {
      const chains = tableHeaderColumnChainsWithFilter(
        [], rows, columns,
      );

      expect(chains[0]).toMatchObject([{
        start: 0,
        columns,
      }]);
    });
  });
});
