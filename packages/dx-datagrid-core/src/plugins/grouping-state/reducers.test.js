import {
    groupByColumn,
} from './reducers';

describe('GroupingState reducers', () => {
  describe('#groupByColumn', () => {
    test('can group by column', () => {
      const grouping = [];
      const payload = { columnName: 'test' };

      const nextGrouping = groupByColumn(grouping, payload);
      expect(nextGrouping).toEqual([
        { column: 'test' },
      ]);
    });

    test('can ungroup by column', () => {
      const grouping = [{ column: 'test' }];
      const payload = { columnName: 'test' };

      const nextGrouping = groupByColumn(grouping, payload);
      expect(nextGrouping).toEqual([]);
    });

    test('can group by several columns', () => {
      const grouping = [{ column: 'column1' }];
      const payload = { columnName: 'column2' };

      const nextGrouping = groupByColumn(grouping, payload);
      expect(nextGrouping).toEqual([
        { column: 'column1' },
        { column: 'column2' },
      ]);
    });

    test('can group by column with a group index', () => {
      const grouping = [{ column: 'column1' }];
      const payload = { columnName: 'column2', groupIndex: 0 };

      const nextGrouping = groupByColumn(grouping, payload);
      expect(nextGrouping).toEqual([
        { column: 'column2' },
        { column: 'column1' },
      ]);
    });
  });
});
