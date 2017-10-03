import {
  groupedGridRows,
  expandedGroupGridRows,
} from './computeds';
import { GRID_GROUP_TYPE } from './constants';

describe('GroupingPlugin computeds', () => {
  const rowsSource = [
    { row: { a: 1, b: 1 } },
    { row: { a: 1, b: 2 } },
    { row: { a: 2, b: 1 } },
    { row: { a: 2, b: 2 } },
  ];
  const getCellValue = (row, columnName) => row[columnName];

  const firstLevelGroupings = [{ columnName: 'a' }];
  const firstLevelGroupedRows = [{
    value: 1,
    key: '1',
    items: [
      { row: { a: 1, b: 1 } },
      { row: { a: 1, b: 2 } },
    ],
  }, {
    value: 2,
    key: '2',
    items: [
      { row: { a: 2, b: 1 } },
      { row: { a: 2, b: 2 } },
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
        { row: { a: 1, b: 1 } },
      ],
    }, {
      value: 2,
      key: '2',
      items: [
        { row: { a: 1, b: 2 } },
      ],
    }],
  }, {
    value: 2,
    key: '2',
    items: [{
      value: 1,
      key: '1',
      items: [
        { row: { a: 2, b: 1 } },
      ],
    }, {
      value: 2,
      key: '2',
      items: [
        { row: { a: 2, b: 2 } },
      ],
    }],
  }];

  describe('#groupedGridRows', () => {
    it('can group by one column', () => {
      expect(groupedGridRows(rowsSource, firstLevelGroupings, getCellValue))
        .toEqual(firstLevelGroupedRows);
    });

    it('can group by several columns', () => {
      expect(groupedGridRows(rowsSource, secondLevelGroupings, getCellValue))
        .toEqual(secondLevelGroupedRows);
    });

    it('should use custom getGroupValue and getGroupKey argument', () => {
      const getGroupValue = jest.fn(value => `${value}_test`);
      const getGroupKey = jest.fn(value => value.substr(0, 1));

      expect(groupedGridRows(rowsSource, firstLevelGroupings, getCellValue, getGroupValue, getGroupKey))
        .toEqual([{
          value: '1_test',
          key: '1',
          items: [
            { row: { a: 1, b: 1 } },
            { row: { a: 1, b: 2 } },
          ],
        }, {
          value: '2_test',
          key: '2',
          items: [
            { row: { a: 2, b: 1 } },
            { row: { a: 2, b: 2 } },
          ],
        }]);
    });

    it('should use custom getGroupValue argument for each grouping', () => {
      const getGroupValue = jest.fn(value => `${value}_test`);

      expect(groupedGridRows(rowsSource, secondLevelGroupings, getCellValue, getGroupValue))
        .toEqual([{
          value: '1_test',
          key: '1_test',
          items: [{
            value: '1_test',
            key: '1_test',
            items: [
              { row: { a: 1, b: 1 } },
            ],
          }, {
            value: '2_test',
            key: '2_test',
            items: [
              { row: { a: 1, b: 2 } },
            ],
          }],
        }, {
          value: '2_test',
          key: '2_test',
          items: [{
            value: '1_test',
            key: '1_test',
            items: [
              { row: { a: 2, b: 1 } },
            ],
          }, {
            value: '2_test',
            key: '2_test',
            items: [
              { row: { a: 2, b: 2 } },
            ],
          }],
        }]);
    });

    it('should pass the row argument to custom getGroupValue', () => {
      const getGroupValue = jest.fn(value => value);
      const grouping = firstLevelGroupings[0];

      groupedGridRows(rowsSource, firstLevelGroupings, getCellValue, getGroupValue);

      expect(getGroupValue)
        .toHaveBeenCalledTimes(rowsSource.length);
      expect(getGroupValue)
        .toHaveBeenCalledWith(rowsSource[0].row.a, grouping, rowsSource[0].row);
      expect(getGroupValue)
        .toHaveBeenCalledWith(rowsSource[1].row.a, grouping, rowsSource[1].row);
      expect(getGroupValue)
        .toHaveBeenCalledWith(rowsSource[2].row.a, grouping, rowsSource[2].row);
      expect(getGroupValue)
        .toHaveBeenCalledWith(rowsSource[3].row.a, grouping, rowsSource[3].row);
    });

    it('should pass the row argument to custom getGroupKey', () => {
      const getGroupValue = jest.fn(value => value);
      const getGroupKey = jest.fn(value => value);
      const grouping = firstLevelGroupings[0];

      groupedGridRows(rowsSource, firstLevelGroupings, getCellValue, getGroupValue, getGroupKey);

      expect(getGroupKey)
        .toHaveBeenCalledTimes(rowsSource.length);
      expect(getGroupKey)
        .toHaveBeenCalledWith(rowsSource[0].row.a, grouping, rowsSource[0].row);
      expect(getGroupKey)
        .toHaveBeenCalledWith(rowsSource[1].row.a, grouping, rowsSource[1].row);
      expect(getGroupKey)
        .toHaveBeenCalledWith(rowsSource[2].row.a, grouping, rowsSource[2].row);
      expect(getGroupKey)
        .toHaveBeenCalledWith(rowsSource[3].row.a, grouping, rowsSource[3].row);
    });
  });

  describe('#expandedGroupGridRows', () => {
    it('can expand groups', () => {
      const expandedGroups = new Set(['1']);

      expect(expandedGroupGridRows(firstLevelGroupedRows, firstLevelGroupings, expandedGroups))
        .toEqual([
          {
            headerKey: `${GRID_GROUP_TYPE}_a`,
            type: GRID_GROUP_TYPE,
            groupedBy: 'a',
            row: { key: '1', value: 1 },
          },
          { row: { a: 1, b: 1 } },
          { row: { a: 1, b: 2 } },
          {
            headerKey: `${GRID_GROUP_TYPE}_a`,
            type: GRID_GROUP_TYPE,
            groupedBy: 'a',
            row: { key: '2', value: 2 },
          },
        ]);
    });

    it('can expand nested groups', () => {
      const expandedGroups = new Set(['1', '1|2']);

      expect(expandedGroupGridRows(secondLevelGroupedRows, secondLevelGroupings, expandedGroups))
        .toEqual([
          {
            headerKey: `${GRID_GROUP_TYPE}_a`,
            type: GRID_GROUP_TYPE,
            groupedBy: 'a',
            row: { key: '1', value: 1 },
          },
          {
            headerKey: `${GRID_GROUP_TYPE}_b`,
            type: GRID_GROUP_TYPE,
            groupedBy: 'b',
            row: { key: '1|1', value: 1 },
          },
          {
            headerKey: `${GRID_GROUP_TYPE}_b`,
            type: GRID_GROUP_TYPE,
            groupedBy: 'b',
            row: { key: '1|2', value: 2 },
          },
          { row: { a: 1, b: 2 } },
          {
            headerKey: `${GRID_GROUP_TYPE}_a`,
            type: GRID_GROUP_TYPE,
            groupedBy: 'a',
            row: { key: '2', value: 2 },
          },
        ]);
    });
  });
});
