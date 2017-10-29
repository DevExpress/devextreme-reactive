import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupedRows,
  expandedGroupRows,
} from './computeds';
import {
  GRID_GROUP_TYPE,
  GRID_GROUP_CHECK,
  GRID_GROUP_LEVEL_KEY,
} from './constants';

describe('LocalGrouping computeds', () => {
  describe('#groupRowChecker', () => {
    it('should work', () => {
      expect(groupRowChecker({}))
        .toBeFalsy();

      expect(groupRowChecker({ [GRID_GROUP_CHECK]: true }))
        .toBeTruthy();
    });
  });

  describe('#groupRowLevelKeyGetter', () => {
    it('should work', () => {
      expect(groupRowLevelKeyGetter({}))
        .toBeFalsy();

      expect(groupRowLevelKeyGetter({ [GRID_GROUP_LEVEL_KEY]: 'a' }))
        .toBe('a');
    });
  });

  const rows = [
    { a: 1, b: 1 },
    { a: 1, b: 2 },
    { a: 2, b: 1 },
    { a: 2, b: 2 },
  ];
  const getCellValue = (row, columnName) => row[columnName];

  const firstGrouping = [{ columnName: 'a' }];
  const firstGroupedRows = [{
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

  const secondGrouping = [{ columnName: 'a' }, { columnName: 'b' }];
  const secondGroupedRows = [{
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
    it('can group by first column', () => {
      expect(groupedRows(rows, firstGrouping, getCellValue))
        .toEqual(firstGroupedRows);
    });

    it('can group by several columns', () => {
      expect(groupedRows(rows, secondGrouping, getCellValue))
        .toEqual(secondGroupedRows);
    });

    it('should use getColumnIdentity', () => {
      const getColumnIdentity = () => value => ({
        key: String(value).substr(0, 1),
        value: `${value}_test`,
      });
      expect(groupedRows(rows, firstGrouping, getCellValue, getColumnIdentity))
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

    it('should use getColumnIdentity argument for each grouping', () => {
      const getColumnIdentity = () => value => ({
        key: `${value}_test`,
      });

      expect(groupedRows(rows, secondGrouping, getCellValue, getColumnIdentity))
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

    it('should pass column name to getColumnIdentity', () => {
      const getColumnIdentity = jest.fn(() => value => value);

      groupedRows(rows, firstGrouping, getCellValue, getColumnIdentity);

      expect(getColumnIdentity)
        .toHaveBeenCalledWith(firstGrouping[0].columnName);
    });

    it('should group using default getColumnIdentity if custom getColumnIdentity returns nothing', () => {
      const getColumnIdentity = () => undefined;
      expect(groupedRows(rows, firstGrouping, getCellValue, getColumnIdentity))
        .toEqual(firstGroupedRows);
    });
  });

  describe('#expandedGroupRows', () => {
    it('can expand groups', () => {
      const expandedGroups = new Set(['1']);

      expect(expandedGroupRows(firstGroupedRows, firstGrouping, expandedGroups))
        .toEqual([
          {
            [GRID_GROUP_CHECK]: true,
            [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_a`,
            groupedBy: 'a',
            key: '1',
            value: 1,
          },
          { a: 1, b: 1 },
          { a: 1, b: 2 },
          {
            [GRID_GROUP_CHECK]: true,
            [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_a`,
            groupedBy: 'a',
            key: '2',
            value: 2,
          },
        ]);
    });

    it('can expand nested groups', () => {
      const expandedGroups = new Set(['1', '1|2']);

      expect(expandedGroupRows(secondGroupedRows, secondGrouping, expandedGroups))
        .toEqual([
          {
            [GRID_GROUP_CHECK]: true,
            [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_a`,
            groupedBy: 'a',
            key: '1',
            value: 1,
          },
          {
            [GRID_GROUP_CHECK]: true,
            [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_b`,
            groupedBy: 'b',
            key: '1|1',
            value: 1,
          },
          {
            [GRID_GROUP_CHECK]: true,
            [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_b`,
            groupedBy: 'b',
            key: '1|2',
            value: 2,
          },
          { a: 1, b: 2 },
          {
            [GRID_GROUP_CHECK]: true,
            [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_a`,
            groupedBy: 'a',
            key: '2',
            value: 2,
          },
        ]);
    });
  });
});
