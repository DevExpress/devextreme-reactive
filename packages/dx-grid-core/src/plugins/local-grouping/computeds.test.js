import {
  groupedGridRows,
  expandedGroupGridRows,
} from './computeds';
import { GRID_GROUP_TYPE } from './constants';

describe('GroupingPlugin computeds', () => {
  const gridRows = [
    { row: { a: 1, b: 1 } },
    { row: { a: 1, b: 2 } },
    { row: { a: 2, b: 1 } },
    { row: { a: 2, b: 2 } },
  ];
  const getCellValue = (row, columnName) => row[columnName];

  const firstGrouping = [{ columnName: 'a' }];
  const firstGroupedGridRows = [{
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

  const secondGrouping = [{ columnName: 'a' }, { columnName: 'b' }];
  const secondGroupedGridRows = [{
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
    it('can group by first column', () => {
      expect(groupedGridRows(gridRows, firstGrouping, getCellValue))
        .toEqual(firstGroupedGridRows);
    });

    it('can group by several columns', () => {
      expect(groupedGridRows(gridRows, secondGrouping, getCellValue))
        .toEqual(secondGroupedGridRows);
    });

    it('should use custom getGroupValue and getGroupKey argument', () => {
      const getGroupValue = jest.fn(value => `${value}_test`);
      const getGroupKey = jest.fn(value => value.substr(0, 1));

      expect(groupedGridRows(gridRows, firstGrouping, getCellValue, getGroupValue, getGroupKey))
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

      expect(groupedGridRows(gridRows, secondGrouping, getCellValue, getGroupValue))
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
      const grouping = firstGrouping[0];

      groupedGridRows(gridRows, firstGrouping, getCellValue, getGroupValue);

      expect(getGroupValue)
        .toHaveBeenCalledTimes(gridRows.length);
      expect(getGroupValue)
        .toHaveBeenCalledWith(gridRows[0].row.a, grouping, gridRows[0].row);
      expect(getGroupValue)
        .toHaveBeenCalledWith(gridRows[1].row.a, grouping, gridRows[1].row);
      expect(getGroupValue)
        .toHaveBeenCalledWith(gridRows[2].row.a, grouping, gridRows[2].row);
      expect(getGroupValue)
        .toHaveBeenCalledWith(gridRows[3].row.a, grouping, gridRows[3].row);
    });

    it('should pass the row argument to custom getGroupKey', () => {
      const getGroupValue = jest.fn(value => value);
      const getGroupKey = jest.fn(value => value);
      const grouping = firstGrouping[0];

      groupedGridRows(gridRows, firstGrouping, getCellValue, getGroupValue, getGroupKey);

      expect(getGroupKey)
        .toHaveBeenCalledTimes(gridRows.length);
      expect(getGroupKey)
        .toHaveBeenCalledWith(gridRows[0].row.a, grouping, gridRows[0].row);
      expect(getGroupKey)
        .toHaveBeenCalledWith(gridRows[1].row.a, grouping, gridRows[1].row);
      expect(getGroupKey)
        .toHaveBeenCalledWith(gridRows[2].row.a, grouping, gridRows[2].row);
      expect(getGroupKey)
        .toHaveBeenCalledWith(gridRows[3].row.a, grouping, gridRows[3].row);
    });
  });

  describe('#expandedGroupGridRows', () => {
    it('can expand groups', () => {
      const expandedGroups = new Set(['1']);

      expect(expandedGroupGridRows(firstGroupedGridRows, firstGrouping, expandedGroups))
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

      expect(expandedGroupGridRows(secondGroupedGridRows, secondGrouping, expandedGroups))
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
