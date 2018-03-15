import { changeSearchValue, pushSearchFilterExpression } from './reducers';

describe('SearchState reducer', () => {
  it('should return new searchValue', () => {
    expect(changeSearchValue('default', 'searchValue')).toBe('searchValue');
  });
});

describe('pushSearchFilterExpression reducer', () => {
  it('should return new filter', () => {
    expect(pushSearchFilterExpression('searchValue')({
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
    expect(pushSearchFilterExpression('searchValue')({
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
