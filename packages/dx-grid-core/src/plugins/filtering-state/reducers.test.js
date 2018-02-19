import {
  changeColumnFilter,
  pushFilterExpr,
} from './reducers';

describe('FilteringState reducers', () => {
  describe('#changeColumnFilter', () => {
    it('can set column filter', () => {
      const filters = [];
      const payload = { columnName: 'column', config: { value: 'value' } };

      const nextFilters = changeColumnFilter(filters, payload);
      expect(nextFilters).toEqual([{ columnName: 'column', value: 'value' }]);
    });

    it('can change column filter', () => {
      const filters = [{ columnName: 'column', value: 'value' }];
      const payload = { columnName: 'column', config: { value: 'new value' } };

      const nextFilters = changeColumnFilter(filters, payload);
      expect(nextFilters).toEqual([{ columnName: 'column', value: 'new value' }]);
    });

    it('can add column filter', () => {
      const filters = [{ columnName: 'column1', value: 'value' }];
      const payload = { columnName: 'column2', config: { value: 'new value' } };

      const nextFilters = changeColumnFilter(filters, payload);
      expect(nextFilters).toEqual([
        { columnName: 'column1', value: 'value' },
        { columnName: 'column2', value: 'new value' },
      ]);
    });

    it('can remove column filter', () => {
      const filters = [{ columnName: 'column', value: 'value' }];
      const payload = { columnName: 'column', config: null };

      const nextFilters = changeColumnFilter(filters, payload);
      expect(nextFilters).toEqual([]);
    });
  });
});

describe('pushFilterExpr reducer', () => {
  it('should return filters', () => {
    expect(pushFilterExpr([
      { columnName: 'first', value: 'searchValue' },
      { columnName: 'second', value: 'searchValue' },
    ])({})).toEqual({
      filters: [
        { columnName: 'first', value: 'searchValue' },
        { columnName: 'second', value: 'searchValue' },
      ],
      operator: 'and',
    });
  });

  it('should return old and new filters', () => {
    expect(pushFilterExpr([
      { columnName: 'first', value: 'searchValue' },
      { columnName: 'second', value: 'searchValue' },
    ])({
      filterExpression: ['filters'],
    })).toEqual({
      filters: [
        ['filters'],
        {
          filters: [
            { columnName: 'first', value: 'searchValue' },
            { columnName: 'second', value: 'searchValue' },
          ],
          operator: 'and',
        },
      ],
      operator: 'and',
    });
  });
});
