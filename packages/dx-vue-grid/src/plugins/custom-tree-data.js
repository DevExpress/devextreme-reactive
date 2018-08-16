import { DxGetter, DxPlugin } from '@devexpress/dx-vue-core';
import {
  customTreeRowLevelKeyGetter,
  customTreeRowIdGetter,
  customTreeRowsWithMeta,
  expandedTreeRows,
  collapsedTreeRowsGetter,
  isTreeRowLeafGetter,
  getTreeRowLevelGetter,
  unwrappedCustomTreeRows,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxTreeDataState' },
];

const expandedTreeRowsComputed = (
  { rows, getRowId, expandedRowIds },
) => expandedTreeRows(rows, getRowId, expandedRowIds);
const getRowIdComputed = (
  { getRowId, rows },
) => customTreeRowIdGetter(getRowId, rows);
const getRowLevelKeyComputed = (
  { getRowLevelKey, rows },
) => customTreeRowLevelKeyGetter(getRowLevelKey, rows);
const isTreeRowLeafComputed = ({ rows }) => isTreeRowLeafGetter(rows);
const getTreeRowLevelComputed = ({ rows }) => getTreeRowLevelGetter(rows);
const collapsedTreeRowsGetterComputed = (
  { rows, getCollapsedRows },
) => collapsedTreeRowsGetter(getCollapsedRows, rows);
const unwrappedTreeRowsComputed = ({ rows }) => unwrappedCustomTreeRows(rows);

export const DxCustomTreeData = {
  name: 'DxCustomTreeData',
  props: {
    getChildRows: {
      type: Function,
      required: true,
    },
  },
  render() {
    const { getChildRows } = this;
    const treeRowsComputed = ({ rows }) => customTreeRowsWithMeta(rows, getChildRows);

    return (
      <DxPlugin
        name="CustomTreeData"
        dependencies={pluginDependencies}
      >
        <DxGetter name="rows" computed={treeRowsComputed} />
        <DxGetter name="getRowId" computed={getRowIdComputed} />
        <DxGetter name="getRowLevelKey" computed={getRowLevelKeyComputed} />
        <DxGetter name="isTreeRowLeaf" computed={isTreeRowLeafComputed} />
        <DxGetter name="getTreeRowLevel" computed={getTreeRowLevelComputed} />
        <DxGetter name="rows" computed={expandedTreeRowsComputed} />
        <DxGetter name="getCollapsedRows" computed={collapsedTreeRowsGetterComputed} />
        <DxGetter name="rows" computed={unwrappedTreeRowsComputed} />
      </DxPlugin>
    );
  },
};
