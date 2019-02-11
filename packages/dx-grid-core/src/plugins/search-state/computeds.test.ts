import { searchFilterExpression } from './computeds';

describe('SearchState computeds', () => {
  describe('#searchFilterExpression', () => {
    it('should return new filter', () => {
      expect(searchFilterExpression('searchValue', [{ name: 'first' }, { name: 'second' }]))
        .toEqual({
          filters: [
            { columnName: 'first', value: 'searchValue' },
            { columnName: 'second', value: 'searchValue' },
          ],
          operator: 'or',
        });
    });

    it('should return old and new filter', () => {
// tslint:disable-next-line: max-line-length
      expect(searchFilterExpression('searchValue', [{ name: 'first' }, { name: 'second' }], ['filters']))
        .toEqual({
          filters: [
            ['filters'],
            {
              filters: [
                { columnName: 'first', value: 'searchValue' },
                { columnName: 'second', value: 'searchValue' },
              ],
              operator: 'or',
            },
          ],
          operator: 'and',
        });
    });
  });
});
