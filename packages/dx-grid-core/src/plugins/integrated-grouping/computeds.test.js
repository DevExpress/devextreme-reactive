import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupCollapsedRowsGetter,
  groupedRows,
  expandedGroupRows,
} from './computeds';
import {
  GRID_GROUP_TYPE,
  GRID_GROUP_CHECK,
  GRID_GROUP_LEVEL_KEY,
  GRID_GROUP_COLLAPSED_ROWS,
} from './constants';

describe('IntegratedGrouping computeds', () => {
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

  const groupRow = ({ groupedBy, collapsedRows, ...restParams }) => ({
    ...restParams,
    groupedBy,
    [GRID_GROUP_CHECK]: true,
    [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_${groupedBy}`,
    ...(collapsedRows ? { [GRID_GROUP_COLLAPSED_ROWS]: collapsedRows } : null),
  });

  const rows = [
    { a: 1, b: 1 },
    { a: 1, b: 2 },
    { a: 2, b: 1 },
    { a: 2, b: 2 },
  ];
  const getCellValue = (row, columnName) => row[columnName];

  const firstGrouping = [{ columnName: 'a' }];
  const firstGroupedRows = [
    groupRow({
      groupedBy: 'a',
      compoundKey: '1',
      key: '1',
      value: 1,
    }),
    { a: 1, b: 1 },
    { a: 1, b: 2 },
    groupRow({
      groupedBy: 'a',
      compoundKey: '2',
      key: '2',
      value: 2,
    }),
    { a: 2, b: 1 },
    { a: 2, b: 2 },
  ];

  const secondGrouping = [{ columnName: 'a' }, { columnName: 'b' }];
  const secondGroupedRows = [
    groupRow({
      groupedBy: 'a',
      compoundKey: '1',
      key: '1',
      value: 1,
    }),
    groupRow({
      groupedBy: 'b',
      compoundKey: '1|1',
      key: '1',
      value: 1,
    }),
    { a: 1, b: 1 },
    groupRow({
      groupedBy: 'b',
      compoundKey: '1|2',
      key: '2',
      value: 2,
    }),
    { a: 1, b: 2 },
    groupRow({
      groupedBy: 'a',
      compoundKey: '2',
      key: '2',
      value: 2,
    }),
    groupRow({
      groupedBy: 'b',
      compoundKey: '2|1',
      key: '1',
      value: 1,
    }),
    { a: 2, b: 1 },
    groupRow({
      groupedBy: 'b',
      compoundKey: '2|2',
      key: '2',
      value: 2,
    }),
    { a: 2, b: 2 },
  ];

  describe('#groupedRows', () => {
    it('can group by first column', () => {
      expect(groupedRows(rows, firstGrouping, getCellValue))
        .toEqual(firstGroupedRows);
    });

    it('can group by several columns', () => {
      expect(groupedRows(rows, secondGrouping, getCellValue))
        .toEqual(secondGroupedRows);
    });

    it('should use getColumnCriteria', () => {
      const getColumnCriteria = () => value => ({
        key: String(value).substr(0, 1),
        value: `${value}_test`,
      });
      expect(groupedRows(rows, firstGrouping, getCellValue, getColumnCriteria))
        .toEqual([
          groupRow({
            groupedBy: 'a',
            compoundKey: '1',
            key: '1',
            value: '1_test',
          }),
          { a: 1, b: 1 },
          { a: 1, b: 2 },
          groupRow({
            groupedBy: 'a',
            compoundKey: '2',
            key: '2',
            value: '2_test',
          }),
          { a: 2, b: 1 },
          { a: 2, b: 2 },
        ]);
    });

    it('should use getColumnCriteria argument for each grouping', () => {
      const getColumnCriteria = () => value => ({
        key: `${value}_test`,
      });

      expect(groupedRows(rows, secondGrouping, getCellValue, getColumnCriteria))
        .toEqual([
          groupRow({
            groupedBy: 'a',
            compoundKey: '1_test',
            key: '1_test',
            value: '1_test',
          }),
          groupRow({
            groupedBy: 'b',
            compoundKey: '1_test|1_test',
            key: '1_test',
            value: '1_test',
          }),
          { a: 1, b: 1 },
          groupRow({
            groupedBy: 'b',
            compoundKey: '1_test|2_test',
            key: '2_test',
            value: '2_test',
          }),
          { a: 1, b: 2 },
          groupRow({
            groupedBy: 'a',
            compoundKey: '2_test',
            key: '2_test',
            value: '2_test',
          }),
          groupRow({
            groupedBy: 'b',
            compoundKey: '2_test|1_test',
            key: '1_test',
            value: '1_test',
          }),
          { a: 2, b: 1 },
          groupRow({
            groupedBy: 'b',
            compoundKey: '2_test|2_test',
            key: '2_test',
            value: '2_test',
          }),
          { a: 2, b: 2 },
        ]);
    });

    it('should pass column name to getColumnCriteria', () => {
      const getColumnCriteria = jest.fn(() => value => value);

      groupedRows(rows, firstGrouping, getCellValue, getColumnCriteria);

      expect(getColumnCriteria)
        .toHaveBeenCalledWith(firstGrouping[0].columnName);
    });

    it('should group using default getColumnCriteria if custom getColumnCriteria returns nothing', () => {
      const getColumnCriteria = () => undefined;
      expect(groupedRows(rows, firstGrouping, getCellValue, getColumnCriteria))
        .toEqual(firstGroupedRows);
    });
  });

  describe('#expandedGroupRows', () => {
    it('can expand groups', () => {
      const expandedGroups = new Set(['1']);

      expect(expandedGroupRows(firstGroupedRows, firstGrouping, expandedGroups))
        .toEqual([
          groupRow({
            groupedBy: 'a',
            compoundKey: '1',
            key: '1',
            value: 1,
          }),
          { a: 1, b: 1 },
          { a: 1, b: 2 },
          groupRow({
            groupedBy: 'a',
            compoundKey: '2',
            key: '2',
            value: 2,
            collapsedRows: [
              { a: 2, b: 1 },
              { a: 2, b: 2 },
            ],
          }),
        ]);
    });

    it('can expand nested groups', () => {
      const expandedGroups = new Set(['1', '1|2']);

      expect(expandedGroupRows(secondGroupedRows, secondGrouping, expandedGroups))
        .toEqual([
          groupRow({
            groupedBy: 'a',
            compoundKey: '1',
            key: '1',
            value: 1,
          }),
          groupRow({
            groupedBy: 'b',
            compoundKey: '1|1',
            key: '1',
            value: 1,
            collapsedRows: [
              { a: 1, b: 1 },
            ],
          }),
          groupRow({
            groupedBy: 'b',
            compoundKey: '1|2',
            key: '2',
            value: 2,
          }),
          { a: 1, b: 2 },
          groupRow({
            groupedBy: 'a',
            compoundKey: '2',
            key: '2',
            value: 2,
            collapsedRows: [
              { a: 2, b: 1 },
              { a: 2, b: 2 },
            ],
          }),
        ]);
    });
  });

  describe('#collapsedTreeRowsGetter', () => {
    const collapsedRows = [
      groupRow({
        collapsedRows: [{ a: 1 }],
      }),
      { a: 1, b: 1 },
    ];

    it('should define collapsed rows', () => {
      const parentGetCollapsedRows = undefined;
      const getCollapsedRows = groupCollapsedRowsGetter(parentGetCollapsedRows);

      expect(getCollapsedRows(collapsedRows[0]))
        .toEqual([{ a: 1 }]);
      expect(getCollapsedRows(1))
        .toBeUndefined();
    });

    it('should provide row levels for unknown rows', () => {
      const parentGetCollapsedRows = () => 0;
      const getCollapsedRows = groupCollapsedRowsGetter(parentGetCollapsedRows);

      expect(getCollapsedRows(1))
        .toBe(0);
    });
  });
});
