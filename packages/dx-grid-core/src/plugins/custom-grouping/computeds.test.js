import {
  customGroupedRows,
  customGroupingRowIdGetter,
} from './computeds';
import {
  GRID_GROUP_TYPE,
  GRID_GROUP_CHECK,
  GRID_GROUP_LEVEL_KEY,
} from '../local-grouping/constants';

describe('CustomGrouping Plugin computeds', () => {
  describe('#customGroupedRows', () => {
    it('should process hierarchical data by one column', () => {
      const hierarchicalSource = [{
        key: 1,
        items: [
          { a: 1, b: 1 },
          { a: 1, b: 2 },
        ],
      }, {
        key: 2,
        items: [
          { a: 2, b: 1 },
          { a: 2, b: 2 },
        ],
      }];
      const getHierarchicalChildGroups = groups => groups
        .map(group => ({ key: String(group.key), value: group.key, nestedData: group.items }));
      const groupings = [{ columnName: 'a' }];
      const groupedRows = [
        {
          [GRID_GROUP_CHECK]: true,
          [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_a`,
          groupedBy: 'a',
          compoundKey: '1',
          key: '1',
          value: 1,
        },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        {
          [GRID_GROUP_CHECK]: true,
          [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_a`,
          groupedBy: 'a',
          compoundKey: '2',
          key: '2',
          value: 2,
        },
        { a: 2, b: 1 },
        { a: 2, b: 2 },
      ];

      const getChildGroups = jest.fn(getHierarchicalChildGroups);

      expect(customGroupedRows(
        hierarchicalSource,
        groupings,
        getChildGroups,
      ))
        .toMatchObject(groupedRows);

      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource, groupings[0], hierarchicalSource);
    });

    it('should process hierarchical data by one column with remote expanded groups', () => {
      const hierarchicalSource = [{
        key: 1,
        items: null,
      }];
      const getHierarchicalChildGroups = groups => groups
        .map(group => ({ key: String(group.key), value: group.key, nestedData: group.items }));
      const groupings = [{ columnName: 'a' }];
      const groupedRows = [
        {
          [GRID_GROUP_CHECK]: true,
          [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_a`,
          groupedBy: 'a',
          compoundKey: '1',
          key: '1',
          value: 1,
        },
      ];

      const getChildGroups = jest.fn(getHierarchicalChildGroups);

      expect(customGroupedRows(
        hierarchicalSource,
        groupings,
        getChildGroups,
      ))
        .toMatchObject(groupedRows);
    });

    it('should process hierarchical data by several columns', () => {
      const hierarchicalSource = [{
        key: 1,
        items: [{
          key: 1,
          items: [
            { a: 1, b: 1 },
          ],
        }, {
          key: 2,
          items: [
            { a: 1, b: 2 },
          ],
        }],
      }, {
        key: 2,
        items: [{
          key: 1,
          items: [
            { a: 2, b: 1 },
          ],
        }, {
          key: 2,
          items: [
            { a: 2, b: 2 },
          ],
        }],
      }];
      const getHierarchicalChildGroups = groups => groups
        .map(group => ({ key: String(group.key), value: group.key, nestedData: group.items }));
      const groupings = [{ columnName: 'a' }, { columnName: 'b' }];
      const groupedRows = [
        {
          [GRID_GROUP_CHECK]: true,
          [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_a`,
          groupedBy: 'a',
          compoundKey: '1',
          key: '1',
          value: 1,
        },
        {
          [GRID_GROUP_CHECK]: true,
          [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_b`,
          groupedBy: 'b',
          compoundKey: '1|1',
          key: '1',
          value: 1,
        },
        { a: 1, b: 1 },
        {
          [GRID_GROUP_CHECK]: true,
          [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_b`,
          groupedBy: 'b',
          compoundKey: '1|2',
          key: '2',
          value: 2,
        },
        { a: 1, b: 2 },
        {
          [GRID_GROUP_CHECK]: true,
          [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_a`,
          groupedBy: 'a',
          compoundKey: '2',
          key: '2',
          value: 2,
        },
        {
          [GRID_GROUP_CHECK]: true,
          [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_b`,
          groupedBy: 'b',
          compoundKey: '2|1',
          key: '1',
          value: 1,
        },
        { a: 2, b: 1 },
        {
          [GRID_GROUP_CHECK]: true,
          [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_b`,
          groupedBy: 'b',
          compoundKey: '2|2',
          key: '2',
          value: 2,
        },
        { a: 2, b: 2 },
      ];

      const getChildGroups = jest.fn(getHierarchicalChildGroups);

      expect(customGroupedRows(
        hierarchicalSource,
        groupings,
        getChildGroups,
      ))
        .toMatchObject(groupedRows);

      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource, groupings[0], hierarchicalSource);
      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource[0].items, groupings[1], hierarchicalSource);
      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource[1].items, groupings[1], hierarchicalSource);
    });
  });

  describe('#customGroupingRowIdGetter', () => {
    it('should define row ids to rows if not present', () => {
      const groupedRows = [
        {
          [GRID_GROUP_CHECK]: true,
          [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_a`,
          groupedBy: 'a',
          key: '1',
          value: 1,
        },
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ];
      const parentGetRowId = () => undefined;
      const getRowId = customGroupingRowIdGetter(parentGetRowId, groupedRows);

      expect(getRowId(groupedRows[1]))
        .toBe(0);
      expect(getRowId(groupedRows[2]))
        .toBe(1);
    });

    it('should not define row ids to empty rows', () => {
      const parentGetRowId = () => undefined;
      const getRowId = customGroupingRowIdGetter(parentGetRowId, [], []);

      expect(getRowId(1))
        .toBe(undefined);
    });

    it('should not define row ids if getRowId is defined', () => {
      const groupedRows = [
        {
          [GRID_GROUP_CHECK]: true,
          [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_a`,
          groupedBy: 'a',
          key: '1',
          value: 1,
        },
        { a: 1, b: 1 },
      ];
      const parentGetRowId = () => 1;
      const getRowId = customGroupingRowIdGetter(parentGetRowId, groupedRows);

      expect(getRowId(1))
        .toBe(1);
    });
  });
});
