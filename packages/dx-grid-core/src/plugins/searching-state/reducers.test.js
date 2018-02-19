import { changeSearchValue, pushSearchFilterExpr } from './reducers';

describe('SearchingState reducer', () => {
  it('should return new searchValue', () => {
    expect(changeSearchValue('default', { searchValue: 'searchValue' })).toBe('searchValue');
  });
});

describe('pushSearchFilterExpr reducer', () => {
  it('should return new filter', () => {
    expect(pushSearchFilterExpr('searchValue')({
      columns: [{ name: 'first' }, { name: 'second' }],
    })).toEqual({
      filters: [
        { columnName: 'first', value: 'searchValue' },
        { columnName: 'second', value: 'searchValue' },
      ],
      operator: 'or',
    });
  });

  it('should return old and new filter', () => {
    expect(pushSearchFilterExpr('searchValue')({
      columns: [{ name: 'first' }, { name: 'second' }],
      filterExpression: ['filters'],
    })).toEqual({
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
