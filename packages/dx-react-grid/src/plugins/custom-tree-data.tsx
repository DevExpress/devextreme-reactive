import * as React from 'react';
import { Getter, Plugin, Getters } from '@devexpress/dx-react-core';
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
import { CustomTreeDataProps } from '../types';

const pluginDependencies = [
  { name: 'TreeDataState' },
];

const expandedTreeRowsComputed = (
  { rows, getRowId, expandedRowIds }: Getters,
) => expandedTreeRows(rows, getRowId, expandedRowIds);
const getRowIdComputed = (
  { getRowId, rows }: Getters,
) => customTreeRowIdGetter(getRowId, rows);
const getRowLevelKeyComputed = (
  { getRowLevelKey, rows }: Getters,
) => customTreeRowLevelKeyGetter(getRowLevelKey, rows);
const isTreeRowLeafComputed = ({ rows }: Getters) => isTreeRowLeafGetter(rows);
const getTreeRowLevelComputed = ({ rows }: Getters) => getTreeRowLevelGetter(rows);
const collapsedTreeRowsGetterComputed = (
  { rows, getCollapsedRows }: Getters,
) => collapsedTreeRowsGetter(getCollapsedRows, rows);
const unwrappedTreeRowsComputed = ({ rows }: Getters) => unwrappedCustomTreeRows(rows);

class CustomTreeDataBase extends React.PureComponent<CustomTreeDataProps> {
  render() {
    const {
      getChildRows,
    } = this.props;
    const treeRowsComputed = ({ rows }: Getters) => customTreeRowsWithMeta(rows, getChildRows);

    return (
      <Plugin
        name="CustomTreeData"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={treeRowsComputed} />
        <Getter name="getRowId" computed={getRowIdComputed} />
        <Getter name="getRowLevelKey" computed={getRowLevelKeyComputed} />
        <Getter name="isTreeRowLeaf" computed={isTreeRowLeafComputed} />
        <Getter name="getTreeRowLevel" computed={getTreeRowLevelComputed} />
        <Getter name="rows" computed={expandedTreeRowsComputed} />
        <Getter name="getCollapsedRows" computed={collapsedTreeRowsGetterComputed} />
        <Getter name="rows" computed={unwrappedTreeRowsComputed} />
      </Plugin>
    );
  }
}

/***
 * A plugin that converts custom formatted tree data to a supported format and performs
 * local row expanding/collapsing.
 * */
export const CustomTreeData: React.ComponentType<CustomTreeDataProps> = CustomTreeDataBase;
