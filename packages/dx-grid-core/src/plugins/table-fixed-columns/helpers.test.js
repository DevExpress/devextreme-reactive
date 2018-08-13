import { getFixedColumnKeys } from './helpers';

describe('TableFixedColumns Plugin helpers', () => {
  describe('#getFixedColumnKeys', () => {
    it('should return the correct array of column keys', () => {
      const tableColumns = [
        { key: 'key_a', column: { name: 'a' } },
        { key: 'key_b', column: { name: 'b' } },
        { key: 'key_type1', type: 'type1' },
        { key: 'key_c', column: { name: 'c' } },
        { key: 'key_d', column: { name: 'd' } },
      ];
      const fixedNames = ['a', 'd'];
      const fixedTypes = ['type1'];

      expect(getFixedColumnKeys(tableColumns, fixedNames, fixedTypes))
        .toEqual(['key_a', 'key_type1', 'key_d']);
    });
  });
});
