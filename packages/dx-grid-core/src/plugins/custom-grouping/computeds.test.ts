import {
  customGroupedRows,
  customGroupingRowIdGetter,
} from './computeds';
import {
  GRID_GROUP_TYPE,
  GRID_GROUP_CHECK,
  GRID_GROUP_LEVEL_KEY,
} from '../integrated-grouping/constants';

describe('CustomGrouping Plugin computeds', () => {
  const groupRow = ({ groupedBy, ...restParams }) => ({
    ...restParams,
    groupedBy,
    [GRID_GROUP_CHECK]: true,
    [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE.toString()}_${groupedBy}`,
  });

  describe('#customGroupedRows', () => {
    it('should process hierarchical data by one column', () => {
      const hierarchicalSource = [
        {
          key: 1,
          items: [
            { a: 1, b: 1 },
            { a: 1, b: 2 },
          ],
        },
        {
          key: 2,
          items: [
            { a: 2, b: 1 },
            { a: 2, b: 2 },
          ],
        },
        {
          key: 3,
          items: [],
        }];
      const getHierarchicalChildGroups = groups => groups
        .map(group => ({ key: String(group.key), value: group.key, childRows: group.items }));
      const groupings = [{ columnName: 'a' }];
      const groupedRows = [
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
        groupRow({
          groupedBy: 'a',
          compoundKey: '3',
          key: '3',
          value: 3,
        }),
      ];

      const getChildGroups = jest.fn(getHierarchicalChildGroups);

      expect(customGroupedRows(
        hierarchicalSource,
        groupings,
        getChildGroups,
      ))
        .toEqual(groupedRows);

      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource, groupings[0], hierarchicalSource);
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
        .map(group => ({ key: String(group.key), value: group.key, childRows: group.items }));
      const groupings = [{ columnName: 'a' }, { columnName: 'b' }];
      const groupedRows = [
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

      const getChildGroups = jest.fn(getHierarchicalChildGroups);

      expect(customGroupedRows(
        hierarchicalSource,
        groupings,
        getChildGroups,
      ))
        .toEqual(groupedRows);

      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource, groupings[0], hierarchicalSource);
      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource[0].items, groupings[1], hierarchicalSource);
      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource[1].items, groupings[1], hierarchicalSource);
    });

    it('should process hierarchical data with remote expanded groups', () => {
      const hierarchicalSource = [{
        key: 1,
        items: null,
      }, {
        key: 2,
        items: [],
      }];
      const getHierarchicalChildGroups = groups => groups
        .map(group => ({ key: String(group.key), value: group.key, childRows: group.items }));
      const groupings = [{ columnName: 'a' }, { columnName: 'b' }];
      const groupedRows = [
        groupRow({
          groupedBy: 'a',
          compoundKey: '1',
          key: '1',
          value: 1,
        }),
        groupRow({
          groupedBy: 'a',
          compoundKey: '2',
          key: '2',
          value: 2,
        }),
      ];

      const getChildGroups = jest.fn(getHierarchicalChildGroups);

      expect(customGroupedRows(
        hierarchicalSource,
        groupings,
        getChildGroups,
      ))
        .toEqual(groupedRows);

      expect(getChildGroups)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('#customGroupingRowIdGetter', () => {
    it('should define row ids to rows if not present', () => {
      const groupedRows = [
        groupRow({
          groupedBy: 'a',
          key: '1',
          value: 1,
        }),
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
      const getRowId = customGroupingRowIdGetter(parentGetRowId, []);

      expect(getRowId(1))
        .toBe(undefined);
    });

    it('should not define row ids if getRowId is defined', () => {
      const groupedRows = [
        groupRow({
          groupedBy: 'a',
          key: '1',
          value: 1,
        }),
        { a: 1, b: 1 },
      ];
      const parentGetRowId = () => 0;
      const getRowId = customGroupingRowIdGetter(parentGetRowId, groupedRows);

      expect(getRowId(1))
        .toBe(0);
    });
  });
});
