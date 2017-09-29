import {
  groupedRows,
  expandedGroupRows,
} from './computeds';

describe('GroupingPlugin computeds', () => {
  const rowsSource = [
    { a: 1, b: 1 },
    { a: 1, b: 2 },
    { a: 2, b: 1 },
    { a: 2, b: 2 },
  ];
  const getCellValue = (row, columnName) => row[columnName];

  const firstLevelGroupings = [{ columnName: 'a' }];
  const firstLevelGroupedRows = [{
    value: 1,
    key: '1',
    items: [
      { a: 1, b: 1 },
      { a: 1, b: 2 },
    ],
  }, {
    value: 2,
    key: '2',
    items: [
      { a: 2, b: 1 },
      { a: 2, b: 2 },
    ],
  }];

  const secondLevelGroupings = [{ columnName: 'a' }, { columnName: 'b' }];
  const secondLevelGroupedRows = [{
    value: 1,
    key: '1',
    items: [{
      value: 1,
      key: '1',
      items: [
        { a: 1, b: 1 },
      ],
    }, {
      value: 2,
      key: '2',
      items: [
        { a: 1, b: 2 },
      ],
    }],
  }, {
    value: 2,
    key: '2',
    items: [{
      value: 1,
      key: '1',
      items: [
        { a: 2, b: 1 },
      ],
    }, {
      value: 2,
      key: '2',
      items: [
        { a: 2, b: 2 },
      ],
    }],
  }];

  describe('#groupedRows', () => {
    it('can group by one column', () => {
      expect(groupedRows(rowsSource, firstLevelGroupings, getCellValue))
        .toEqual(firstLevelGroupedRows);
    });

    it('can group by several columns', () => {
      expect(groupedRows(rowsSource, secondLevelGroupings, getCellValue))
        .toEqual(secondLevelGroupedRows);
    });

    it('should use custom getGroupValue and getGroupKey argument', () => {
      const getGroupValue = jest.fn(() => value => `${value}_test`);
      const getGroupKey = jest.fn(() => value => value.substr(0, 1));

      expect(groupedRows(rowsSource, firstLevelGroupings, getCellValue, getGroupValue, getGroupKey))
        .toEqual([{
          value: '1_test',
          key: '1',
          items: [
            { a: 1, b: 1 },
            { a: 1, b: 2 },
          ],
        }, {
          value: '2_test',
          key: '2',
          items: [
            { a: 2, b: 1 },
            { a: 2, b: 2 },
          ],
        }]);
    });

    it('should use custom getGroupValue argument for each grouping', () => {
      const getGroupValue = jest.fn(() => value => `${value}_test`);

      expect(groupedRows(rowsSource, secondLevelGroupings, getCellValue, getGroupValue))
        .toEqual([{
          value: '1_test',
          key: '1_test',
          items: [{
            value: '1_test',
            key: '1_test',
            items: [
              { a: 1, b: 1 },
            ],
          }, {
            value: '2_test',
            key: '2_test',
            items: [
              { a: 1, b: 2 },
            ],
          }],
        }, {
          value: '2_test',
          key: '2_test',
          items: [{
            value: '1_test',
            key: '1_test',
            items: [
              { a: 2, b: 1 },
            ],
          }, {
            value: '2_test',
            key: '2_test',
            items: [
              { a: 2, b: 2 },
            ],
          }],
        }]);
    });

    it('should pass column name to custom getGroupValue', () => {
      const getGroupValue = jest.fn(() => value => value);

      groupedRows(rowsSource, firstLevelGroupings, getCellValue, getGroupValue);

      expect(getGroupValue)
        .toHaveBeenCalledWith(firstLevelGroupings[0].columnName);
    });

    it('should pass column name to custom getGroupKey', () => {
      const getGroupValue = jest.fn(() => value => value);
      const getGroupKey = jest.fn(() => value => value);

      groupedRows(rowsSource, firstLevelGroupings, getCellValue, getGroupValue, getGroupKey);

      expect(getGroupKey)
        .toHaveBeenCalledWith(firstLevelGroupings[0].columnName);
    });

    it('should group using default getGroupValue if custom getGroupValue returns nothing', () => {
      const getGroupValue = () => undefined;
      expect(groupedRows(rowsSource, firstLevelGroupings, getCellValue, getGroupValue))
        .toEqual(firstLevelGroupedRows);
    });

    it('should group using default getGroupKey if custom getGroupKey returns nothing', () => {
      const getGroupValue = () => value => value;
      const getGroupKey = () => undefined;
      expect(groupedRows(rowsSource, firstLevelGroupings, getCellValue, getGroupValue, getGroupKey))
        .toEqual(firstLevelGroupedRows);
    });
  });

  describe('#expandedGroupRows', () => {
    it('can expand groups', () => {
      const expandedGroups = new Set(['1']);

      expect(expandedGroupRows(firstLevelGroupedRows, firstLevelGroupings, expandedGroups))
        .toEqual([
          {
            _headerKey: 'groupRow_a',
            type: 'groupRow',
            groupedBy: 'a',
            key: '1',
            value: 1,
          },
          { a: 1, b: 1 },
          { a: 1, b: 2 },
          {
            _headerKey: 'groupRow_a',
            type: 'groupRow',
            groupedBy: 'a',
            key: '2',
            value: 2,
          },
        ]);
    });

    it('can expand nested groups', () => {
      const expandedGroups = new Set(['1', '1|2']);

      expect(expandedGroupRows(secondLevelGroupedRows, secondLevelGroupings, expandedGroups))
        .toEqual([
          {
            _headerKey: 'groupRow_a',
            type: 'groupRow',
            groupedBy: 'a',
            key: '1',
            value: 1,
          },
          {
            _headerKey: 'groupRow_b',
            type: 'groupRow',
            groupedBy: 'b',
            key: '1|1',
            value: 1,
          },
          {
            _headerKey: 'groupRow_b',
            type: 'groupRow',
            groupedBy: 'b',
            key: '1|2',
            value: 2,
          },
          { a: 1, b: 2 },
          {
            _headerKey: 'groupRow_a',
            type: 'groupRow',
            groupedBy: 'a',
            key: '2',
            value: 2,
          },
        ]);
    });
  });
});
