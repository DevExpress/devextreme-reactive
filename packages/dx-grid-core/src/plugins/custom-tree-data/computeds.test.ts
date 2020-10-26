// tslint:disable-next-line: import-name
import Immutable from 'seamless-immutable';
import { GRID_TREE_NODE_TYPE } from './constants';
import {
  customTreeRowsWithMeta,
  customTreeRowIdGetter,
  customTreeRowLevelKeyGetter,
  expandedTreeRows,
  collapsedTreeRowsGetter,
  isTreeRowLeafGetter,
  getTreeRowLevelGetter,
  unwrappedCustomTreeRows,
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
      const getHierarchicalChildRows = (row, rootRows) => (row ? row.items : rootRows);
      const linearizedRows = {
        /* tslint:disable ter-indent align */
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
        /* tslint:enable ter-indent align */
        treeMeta: new Map([
          [hierarchicalSource[0], { level: 0, leaf: true }],
          [hierarchicalSource[1], { level: 0, leaf: false }],
          [hierarchicalSource[1].items[0], { level: 1, leaf: true }],
          [hierarchicalSource[1].items[1], { level: 1, leaf: true }],
          [hierarchicalSource[2], { level: 0, leaf: false }],
          [hierarchicalSource[2].items[0], { level: 1, leaf: false }],
          [hierarchicalSource[2].items[0].items[0], { level: 2, leaf: true }],
          [hierarchicalSource[2].items[1], { level: 1, leaf: true }],
          [hierarchicalSource[3], { level: 0, leaf: true }],
        ]),
      };

      const getChildGroups = jest.fn(getHierarchicalChildRows);

      expect(customTreeRowsWithMeta(hierarchicalSource, getChildGroups))
        .toEqual(linearizedRows);

      [null, ...linearizedRows.rows].forEach(row => expect(getChildGroups)
        .toBeCalledWith(row, hierarchicalSource));
    });

    it('should process plain data', () => {
      const plainSource = [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3, parentId: 0 },
        { id: 4, parentId: 0 },
        { id: 5, parentId: 1 },
        { id: 6, parentId: 1 },
        { id: 7, parentId: 5 },
      ];
      const getPlainChildRows = (row, rootRows) => {
        const childRows = rootRows.filter(r => r.parentId === (row ? row.id : undefined));
        return childRows.length ? childRows : null;
      };
      const linearizedRows = {
        /* tslint:disable ter-indent align */
        rows: [
          plainSource[0],
            plainSource[3],
            plainSource[4],
          plainSource[1],
            plainSource[5],
              plainSource[7],
            plainSource[6],
          plainSource[2],
        ],
        /* tslint:enable ter-indent align */
        treeMeta: new Map([
          [plainSource[0], { level: 0, leaf: false }],
          [plainSource[3], { level: 1, leaf: true }],
          [plainSource[4], { level: 1, leaf: true }],
          [plainSource[1], { level: 0, leaf: false }],
          [plainSource[5], { level: 1, leaf: false }],
          [plainSource[7], { level: 2, leaf: true }],
          [plainSource[6], { level: 1, leaf: true }],
          [plainSource[2], { level: 0, leaf: true }],
        ]),
      };

      const getChildGroups = jest.fn(getPlainChildRows);

      expect(customTreeRowsWithMeta(plainSource, getChildGroups))
        .toEqual(linearizedRows);

      [null, ...linearizedRows.rows].forEach(row => expect(getChildGroups)
        .toBeCalledWith(row, plainSource));
    });

    it('should process remote data', () => {
      const plainSource = [
        { id: 0, hasItems: true },
        { id: 1, hasItems: true },
        { id: 2, hasItems: false },
        { id: 3, parentId: 1, hasItems: true },
        { id: 4, parentId: 1, hasItems: false },
        { id: 5, parentId: 3, hasItems: false },
      ];
      const getPlainChildRows = (row, rootRows) => {
        const childRows = rootRows.filter(r => r.parentId === (row ? row.id : undefined));
        if (childRows.length) {
          return childRows;
        }
        return row && row.hasItems ? [] : null;
      };
      const linearizedRows = {
        /* tslint:disable ter-indent align */
        rows: [
          plainSource[0],
          plainSource[1],
            plainSource[3],
              plainSource[5],
            plainSource[4],
          plainSource[2],
        ],
        /* tslint:enable ter-indent align */
        treeMeta: new Map([
          [plainSource[0], { level: 0, leaf: false }],
          [plainSource[1], { level: 0, leaf: false }],
          [plainSource[3], { level: 1, leaf: false }],
          [plainSource[5], { level: 2, leaf: true }],
          [plainSource[4], { level: 1, leaf: true }],
          [plainSource[2], { level: 0, leaf: true }],
        ]),
      };

      const getChildGroups = jest.fn(getPlainChildRows);

      expect(customTreeRowsWithMeta(plainSource, getChildGroups))
        .toEqual(linearizedRows);

      [null, ...linearizedRows.rows].forEach(row => expect(getChildGroups)
        .toBeCalledWith(row, plainSource));
    });
  });

  describe('#customTreeRowIdGetter', () => {
    const rows = [
      { a: 1 },
      { a: 1, b: 1 },
    ];
    const linearizedRows = {
      rows,
      treeMeta: new Map([
        [rows[0], { level: 0 }],
        [rows[1], { level: 1 }],
      ]),
    };

    it('should define row ids to rows if not present', () => {
      const parentGetRowId = () => undefined;
      const getRowId = customTreeRowIdGetter(parentGetRowId, linearizedRows);

      expect(getRowId(linearizedRows.rows[0]))
        .toBe(0);
      expect(getRowId(linearizedRows.rows[1]))
        .toBe(1);
    });

    it('should define row ids to rows if not present for nested rows', () => {
      const parentGetRowId = (row) => {
        if (row === linearizedRows.rows[0]) return 1;
        return undefined;
      };
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
      treeMeta: new Map([
        [rows[0], { level: 0 }],
        [rows[1], { level: 1 }],
      ]),
    };

    it('should define row levels', () => {
      const parentGetRowLevelKey = undefined;
      const getRowLevelKey = customTreeRowLevelKeyGetter(parentGetRowLevelKey, linearizedRows);

      expect(getRowLevelKey(linearizedRows.rows[0]))
        .toBe(`${GRID_TREE_NODE_TYPE.toString()}_0`);
      expect(getRowLevelKey(linearizedRows.rows[1]))
        .toBe(`${GRID_TREE_NODE_TYPE.toString()}_1`);
    });

    it('should provide row levels for unknown rows', () => {
      const parentGetRowLevelKey = () => 0;
      const getRowLevelKey = customTreeRowLevelKeyGetter(parentGetRowLevelKey, linearizedRows);

      expect(getRowLevelKey(1))
        .toBe(0);
    });
  });

  describe('#expandedTreeRows', () => {
    const expandedRowIds = [1];
    it('should collapse rows', () => {
      /* tslint:disable ter-indent align */
      const rows = [
        { a: 0 },
        { a: 1 },
          { a: 1, b: 1 },
            { a: 1, b: 1, c: 1 },
        { a: 2 },
          { a: 2, b: 1 },
            { a: 2, b: 1, c: 1 },
      ];
      /* tslint:enable ter-indent align */
      const linearizedRows = {
        rows,
        treeMeta: new Map([
          [rows[0], { level: 0 }],
          [rows[1], { level: 0 }],
          [rows[2], { level: 1 }],
          [rows[3], { level: 2 }],
          [rows[4], { level: 0 }],
          [rows[5], { level: 1 }],
          [rows[6], { level: 2 }],
        ]),
      };
      const getRowId = row => rows.indexOf(row);

      const expandedLinearizedRows = {
        /* tslint:disable ter-indent align */
        rows: [
          { a: 0 },
          { a: 1 },
            { a: 1, b: 1 },
          { a: 2 },
        ],
        /* tslint:enable ter-indent align */
        treeMeta: linearizedRows.treeMeta,
        collapsedRowsMeta: new Map([
          [rows[2], [rows[3]]],
          [rows[4], [rows[5], rows[6]]],
        ]),
      };

      expect(expandedTreeRows(linearizedRows, getRowId, expandedRowIds))
        .toEqual(expandedLinearizedRows);
    });

    it('should collapse Immutable rows', () => {
      /* tslint:disable ter-indent align */
      const rows = Immutable([
        { a: 0 },
        { a: 1 },
          { a: 1, b: 1 },
            { a: 1, b: 1, c: 1 },
        { a: 2 },
          { a: 2, b: 1 },
            { a: 2, b: 1, c: 1 },
      ]);
      /* tslint:enable ter-indent align */
      const linearizedRows = {
        rows,
        treeMeta: new Map([
          [rows[0], { level: 0 }],
          [rows[1], { level: 0 }],
          [rows[2], { level: 1 }],
          [rows[3], { level: 2 }],
          [rows[4], { level: 0 }],
          [rows[5], { level: 1 }],
          [rows[6], { level: 2 }],
        ]),
      };
      const getRowId = row => rows.indexOf(row);

      const expandedLinearizedRows = {
        /* tslint:disable ter-indent align */
        rows: [
          { a: 0 },
          { a: 1 },
            { a: 1, b: 1 },
          { a: 2 },
        ],
        /* tslint:enable ter-indent align */
        treeMeta: linearizedRows.treeMeta,
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

  describe('#isTreeRowLeafGetter', () => {
    const rows = [
      { a: 1 },
      { a: 1, b: 1 },
    ];
    const linearizedRows = {
      rows,
      treeMeta: new Map([
        [rows[0], { leaf: false }],
        [rows[1], { leaf: true }],
      ]),
    };

    it('should define leaf rows', () => {
      const isTreeRowLeaf = isTreeRowLeafGetter(linearizedRows);

      expect(isTreeRowLeaf(linearizedRows.rows[0]))
        .toBe(false);
      expect(isTreeRowLeaf(linearizedRows.rows[1]))
        .toBe(true);
      expect(isTreeRowLeaf({}))
        .toBe(undefined);
    });
  });

  describe('#getTreeRowLevelGetter', () => {
    const rows = [
      { a: 1 },
      { a: 1, b: 1 },
    ];
    const linearizedRows = {
      rows,
      treeMeta: new Map([
        [rows[0], { level: 0 }],
        [rows[1], { level: 1 }],
      ]),
    };

    it('should define leaf rows', () => {
      const getTreeRowLevel = getTreeRowLevelGetter(linearizedRows);

      expect(getTreeRowLevel(linearizedRows.rows[0]))
        .toBe(0);
      expect(getTreeRowLevel(linearizedRows.rows[1]))
        .toBe(1);
      expect(getTreeRowLevel({}))
        .toBe(undefined);
    });
  });

  describe('#unwrappedFilteredRows', () => {
    it('should provide unwrapped rows', () => {
      const rows = [];

      expect(unwrappedCustomTreeRows({ rows }))
        .toBe(rows);
    });
  });
});
