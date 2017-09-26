import {
  groupedRows,
  expandedGroupRows,
} from './computeds';

describe('GroupingPlugin computeds', () => {
  const rowsSource = [
    { rowData: { a: 1, b: 1 } },
    { rowData: { a: 1, b: 2 } },
    { rowData: { a: 2, b: 1 } },
    { rowData: { a: 2, b: 2 } },
  ];
  const getCellValue = (row, columnName) => row[columnName];

  const firstLevelGroupings = [{ columnName: 'a' }];
  const firstLevelGroupedRows = [{
    value: 1,
    key: '1',
    items: [
      { rowData: { a: 1, b: 1 } },
      { rowData: { a: 1, b: 2 } },
    ],
  }, {
    value: 2,
    key: '2',
    items: [
      { rowData: { a: 2, b: 1 } },
      { rowData: { a: 2, b: 2 } },
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
        { rowData: { a: 1, b: 1 } },
      ],
    }, {
      value: 2,
      key: '2',
      items: [
        { rowData: { a: 1, b: 2 } },
      ],
    }],
  }, {
    value: 2,
    key: '2',
    items: [{
      value: 1,
      key: '1',
      items: [
        { rowData: { a: 2, b: 1 } },
      ],
    }, {
      value: 2,
      key: '2',
      items: [
        { rowData: { a: 2, b: 2 } },
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
      const getGroupValue = jest.fn(value => `${value}_test`);
      const getGroupKey = jest.fn(value => value.substr(0, 1));

      expect(groupedRows(rowsSource, firstLevelGroupings, getCellValue, getGroupValue, getGroupKey))
        .toEqual([{
          value: '1_test',
          key: '1',
          items: [
            { rowData: { a: 1, b: 1 } },
            { rowData: { a: 1, b: 2 } },
          ],
        }, {
          value: '2_test',
          key: '2',
          items: [
            { rowData: { a: 2, b: 1 } },
            { rowData: { a: 2, b: 2 } },
          ],
        }]);
    });

    it('should use custom getGroupValue argument for each grouping', () => {
      const getGroupValue = jest.fn(value => `${value}_test`);

      expect(groupedRows(rowsSource, secondLevelGroupings, getCellValue, getGroupValue))
        .toEqual([{
          value: '1_test',
          key: '1_test',
          items: [{
            value: '1_test',
            key: '1_test',
            items: [
              { rowData: { a: 1, b: 1 } },
            ],
          }, {
            value: '2_test',
            key: '2_test',
            items: [
              { rowData: { a: 1, b: 2 } },
            ],
          }],
        }, {
          value: '2_test',
          key: '2_test',
          items: [{
            value: '1_test',
            key: '1_test',
            items: [
              { rowData: { a: 2, b: 1 } },
            ],
          }, {
            value: '2_test',
            key: '2_test',
            items: [
              { rowData: { a: 2, b: 2 } },
            ],
          }],
        }]);
    });

    it('should pass the row argument to custom getGroupValue', () => {
      const getGroupValue = jest.fn(value => value);
      const grouping = firstLevelGroupings[0];

      groupedRows(rowsSource, firstLevelGroupings, getCellValue, getGroupValue);

      expect(getGroupValue)
        .toHaveBeenCalledTimes(rowsSource.length);
      expect(getGroupValue)
        .toHaveBeenCalledWith(rowsSource[0].rowData.a, grouping, rowsSource[0].rowData);
      expect(getGroupValue)
        .toHaveBeenCalledWith(rowsSource[1].rowData.a, grouping, rowsSource[1].rowData);
      expect(getGroupValue)
        .toHaveBeenCalledWith(rowsSource[2].rowData.a, grouping, rowsSource[2].rowData);
      expect(getGroupValue)
        .toHaveBeenCalledWith(rowsSource[3].rowData.a, grouping, rowsSource[3].rowData);
    });

    it('should pass the row argument to custom getGroupKey', () => {
      const getGroupValue = jest.fn(value => value);
      const getGroupKey = jest.fn(value => value);
      const grouping = firstLevelGroupings[0];

      groupedRows(rowsSource, firstLevelGroupings, getCellValue, getGroupValue, getGroupKey);

      expect(getGroupKey)
        .toHaveBeenCalledTimes(rowsSource.length);
      expect(getGroupKey)
        .toHaveBeenCalledWith(rowsSource[0].rowData.a, grouping, rowsSource[0].rowData);
      expect(getGroupKey)
        .toHaveBeenCalledWith(rowsSource[1].rowData.a, grouping, rowsSource[1].rowData);
      expect(getGroupKey)
        .toHaveBeenCalledWith(rowsSource[2].rowData.a, grouping, rowsSource[2].rowData);
      expect(getGroupKey)
        .toHaveBeenCalledWith(rowsSource[3].rowData.a, grouping, rowsSource[3].rowData);
    });
  });

  describe('#expandedGroupRows', () => {
    it('can expand groups', () => {
      const expandedGroups = new Set(['1']);

      expect(expandedGroupRows(firstLevelGroupedRows, firstLevelGroupings, expandedGroups))
        .toEqual([
          {
            headerKey: 'groupRow_a',
            type: 'groupRow',
            groupedBy: 'a',
            rowData: { key: '1', value: 1 },
          },
          { rowData: { a: 1, b: 1 } },
          { rowData: { a: 1, b: 2 } },
          {
            headerKey: 'groupRow_a',
            type: 'groupRow',
            groupedBy: 'a',
            rowData: { key: '2', value: 2 },
          },
        ]);
    });

    it('can expand nested groups', () => {
      const expandedGroups = new Set(['1', '1|2']);

      expect(expandedGroupRows(secondLevelGroupedRows, secondLevelGroupings, expandedGroups))
        .toEqual([
          {
            headerKey: 'groupRow_a',
            type: 'groupRow',
            groupedBy: 'a',
            rowData: { key: '1', value: 1 },
          },
          {
            headerKey: 'groupRow_b',
            type: 'groupRow',
            groupedBy: 'b',
            rowData: { key: '1|1', value: 1 },
          },
          {
            headerKey: 'groupRow_b',
            type: 'groupRow',
            groupedBy: 'b',
            rowData: { key: '1|2', value: 2 },
          },
          { rowData: { a: 1, b: 2 } },
          {
            headerKey: 'groupRow_a',
            type: 'groupRow',
            groupedBy: 'a',
            rowData: { key: '2', value: 2 },
          },
        ]);
    });
  });
});
