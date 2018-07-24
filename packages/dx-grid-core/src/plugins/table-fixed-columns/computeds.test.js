import { fixedColumnKeys } from './computeds';

describe('TableFixedColumns Plugin computeds', () => {
  describe('#fixedColumnKeys', () => {
    it('should return an array of all fixed column keys', () => {
      const beforeColumnNames = ['a', 'b'];
      const afterColumnNames = ['f'];
      const tableColumns = [
        { column: { name: 'a' }, key: 'data_a' },
        { column: { name: 'b' }, key: 'data_b' },
        { column: { name: 'c' }, key: 'data_c' },
        { column: { name: 'd' }, key: 'data_d' },
        { column: { name: 'e' }, key: 'data_e' },
        { column: { name: 'f' }, key: 'data_f' },
      ];
      expect(fixedColumnKeys(tableColumns, beforeColumnNames, afterColumnNames))
        .toEqual([
          'data_a',
          'data_b',
          'data_f',
        ]);
    });

    xit('should contain edit column if available', () => {});
    xit('should contain selection column if available', () => {});
  });
});
