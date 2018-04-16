import {
  changeColumnFilter,
  pushFilterExpression,
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

describe('pushFilterExpression reducer', () => {
  it('should return filters', () => {
    expect(pushFilterExpression([
      { columnName: 'first', value: 'value' },
      { columnName: 'second', value: 'value' },
    ])({})).toEqual({
      filters: [
        { columnName: 'first', value: 'value' },
        { columnName: 'second', value: 'value' },
      ],
      operator: 'and',
    });
  });

  it('should return old and new filters', () => {
    expect(pushFilterExpression([
      { columnName: 'first', value: 'value' },
      { columnName: 'second', value: 'value' },
    ])({
      filterExpression: ['filters'],
    })).toEqual({
      filters: [
        ['filters'],
        {
          filters: [
            { columnName: 'first', value: 'value' },
            { columnName: 'second', value: 'value' },
          ],
          operator: 'and',
        },
      ],
      operator: 'and',
    });
  });
});
