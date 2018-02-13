import { GRID_TREE_NODE_TYPE } from './constants';
import {
  customTreeRowsWithMeta,
  customTreeRowIdGetter,
  customTreeRowLevelKeyGetter,
  expandedTreeRows,
  collapsedTreeRowsGetter,
} from './computeds';

describe('CustomTreeData Plugin computeds', () => {
  describe('#customTreeRowsWithMeta', () => {
    it('should process hierarchical data', () => {
      const hierarchicalSource = [
        { a: 0 },
        { a: 1, items: [{ a: 1, b: 1 }, { a: 1, b: 2 }] },
        { a: 2, items: [{ a: 2, b: 1, items: [{ a: 2, b: 1, c: 1 }] }, { a: 2, b: 2 }] },
        { a: 3 },
      ];
      const getHierarchicalChildRows = rows => rows
        .map(row => ({ row, childRows: row.items }));
      const linearizedRows = {
        /* eslint-disable indent */
        rows: [
          hierarchicalSource[0],
          hierarchicalSource[1],
            hierarchicalSource[1].items[0],
            hierarchicalSource[1].items[1],
          hierarchicalSource[2],
            hierarchicalSource[2].items[0],
              hierarchicalSource[2].items[0].items[0],
            hierarchicalSource[2].items[1],
          hierarchicalSource[3],
        ],
        /* eslint-enable indent */
        levelsMeta: new Map([
          [hierarchicalSource[0], 0],
          [hierarchicalSource[1], 0],
          [hierarchicalSource[2], 0],
          [hierarchicalSource[2].items[0], 1],
          [hierarchicalSource[2].items[1], 1],
          [hierarchicalSource[3], 0],
        ]),
        leafsMeta: new Map([
          [hierarchicalSource[1], false],
          [hierarchicalSource[2], false],
          [hierarchicalSource[2].items[0], false],
        ]),
      };

      const getChildGroups = jest.fn(getHierarchicalChildRows);

      expect(customTreeRowsWithMeta(hierarchicalSource, getChildGroups))
        .toEqual(linearizedRows);

      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource, hierarchicalSource);
      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource[1].items, hierarchicalSource);
      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource[2].items, hierarchicalSource);
      expect(getChildGroups)
        .toBeCalledWith(hierarchicalSource[2].items[0].items, hierarchicalSource);
    });
  });

  describe('#customTreeRowIdGetter', () => {
    const rows = [
      { a: 1 },
      { a: 1, b: 1 },
    ];
    const linearizedRows = {
      rows,
    };

    it('should define row ids to rows if not present', () => {
      const parentGetRowId = () => undefined;
      const getRowId = customTreeRowIdGetter(parentGetRowId, linearizedRows);

      expect(getRowId(linearizedRows.rows[0]))
        .toBe(0);
      expect(getRowId(linearizedRows.rows[1]))
        .toBe(1);
    });

    it('should not define row ids if getRowId is defined', () => {
      const parentGetRowId = () => 0;
      const getRowId = customTreeRowIdGetter(parentGetRowId, linearizedRows);

      expect(getRowId(1))
        .toBe(0);
    });
  });

  describe('#customTreeRowLevelKeyGetter', () => {
    const rows = [
      { a: 1 },
      { a: 1, b: 1 },
    ];
    const linearizedRows = {
      rows,
      levelsMeta: new Map([
        [rows[0], 0],
        [rows[1], 1],
      ]),
    };

    it('should define row levels', () => {
      const parentGetRowLevelKey = undefined;
      const getRowLevelKey = customTreeRowLevelKeyGetter(parentGetRowLevelKey, linearizedRows);

      expect(getRowLevelKey(linearizedRows.rows[0]))
        .toBe(`${GRID_TREE_NODE_TYPE}_0`);
      expect(getRowLevelKey(linearizedRows.rows[1]))
        .toBe(`${GRID_TREE_NODE_TYPE}_1`);
    });

    it('should provide row levels for unknown rows', () => {
      const parentGetRowLevelKey = () => 0;
      const getRowLevelKey = customTreeRowLevelKeyGetter(parentGetRowLevelKey, linearizedRows);

      expect(getRowLevelKey(1))
        .toBe(0);
    });
  });

  describe('#expandedTreeRows', () => {
    it('should collapse rows', () => {
      /* eslint-disable indent */
      const rows = [
        { a: 0 },
        { a: 1 },
          { a: 1, b: 1 },
            { a: 1, b: 1, c: 1 },
        { a: 2 },
          { a: 2, b: 1 },
            { a: 2, b: 1, c: 1 },
      ];
      /* eslint-enable indent */
      const linearizedRows = {
        rows,
        levelsMeta: new Map([
          [rows[0], 0],
          [rows[1], 0],
          [rows[2], 1],
          [rows[4], 0],
          [rows[5], 1],
        ]),
      };
      const getRowId = row => rows.indexOf(row);
      const expandedRowIds = [1];

      const expandedLinearizedRows = {
        /* eslint-disable indent */
        rows: [
          { a: 0 },
          { a: 1 },
            { a: 1, b: 1 },
          { a: 2 },
        ],
        /* eslint-enable indent */
        levelsMeta: linearizedRows.levelsMeta,
        collapsedRowsMeta: new Map([
          [rows[2], [rows[3]]],
          [rows[4], [rows[5], rows[6]]],
        ]),
      };

      expect(expandedTreeRows(linearizedRows, getRowId, expandedRowIds))
        .toEqual(expandedLinearizedRows);
    });
  });

  describe('#collapsedTreeRowsGetter', () => {
    const rows = [
      { a: 1 },
      { a: 1, b: 1 },
    ];
    const linearizedRows = {
      rows,
      collapsedRowsMeta: new Map([
        [rows[0], [0]],
        [rows[1], [1]],
      ]),
    };

    it('should define collapsed rows', () => {
      const parentGetCollapsedRows = undefined;
      const getCollapsedRows = collapsedTreeRowsGetter(parentGetCollapsedRows, linearizedRows);

      expect(getCollapsedRows(linearizedRows.rows[0]))
        .toEqual([0]);
      expect(getCollapsedRows(1))
        .toBeUndefined();
    });

    it('should provide row levels for unknown rows', () => {
      const parentGetCollapsedRows = () => 0;
      const getCollapsedRows = collapsedTreeRowsGetter(parentGetCollapsedRows, linearizedRows);

      expect(getCollapsedRows(1))
        .toBe(0);
    });
  });
});
