import { filterExpression } from './computeds';

describe('FilteringState computeds', () => {
  describe('#filterExpression', () => {
    it('should return filters', () => {
      const filters = [
        { columnName: 'first', value: 'value' },
        { columnName: 'second', value: 'value' },
      ];
      expect(filterExpression(filters)).toEqual({
        filters,
        operator: 'and',
      });
    });

    it('should return old and new filters', () => {
      const filters = [
        { columnName: 'first', value: 'value' },
        { columnName: 'second', value: 'value' },
      ];
      const expression = { filters: 'filters' };
      expect(filterExpression(filters, expression)).toEqual({
        filters: [
          expression,
          {
            filters,
            operator: 'and',
          },
        ],
        operator: 'and',
      });
    });
  });
});
