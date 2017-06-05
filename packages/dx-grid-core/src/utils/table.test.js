import {
  tableColumnKeyGetter,
  tableRowKeyGetter,
} from './table';

describe('table utils', () => {
  describe('#tableColumnKeyGetter', () => {
    it('should correctly return keys', () => {
      const columns = [{ type: 'test' }, { type: 'test', id: 'a' }, { name: 'a' }, { name: 'b', id: 'bb' }];

      expect(columns.map(tableColumnKeyGetter))
        .toEqual([
          'test_$0',
          'test_a',
          'data_a',
          'data_b',
        ]);
    });
  });

  describe('#tableRowKeyGetter', () => {
    it('should correctly return keys', () => {
      const rows = [{ type: 'test' }, { type: 'test', id: 'a' }, { name: 'a' }, { name: 'b', id: 'bb' }];
      const getRowId = row => rows.filter(r => !r.type).indexOf(row);

      expect(rows.map((row, rowIndex) => tableRowKeyGetter(getRowId, row, rowIndex)))
        .toEqual([
          'test_$0',
          'test_a',
          'data_0',
          'data_1',
        ]);
    });
  });
});
