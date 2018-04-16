import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';
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
  { name: 'TreeDataState' },
];

const expandedTreeRowsComputed = ({ rows, getRowId, expandedRowIds }) =>
  expandedTreeRows(rows, getRowId, expandedRowIds);
const getRowIdComputed = ({ getRowId, rows }) =>
  customTreeRowIdGetter(getRowId, rows);
const getRowLevelKeyComputed = ({ getRowLevelKey, rows }) =>
  customTreeRowLevelKeyGetter(getRowLevelKey, rows);
const isTreeRowLeafComputed = ({ rows }) =>
  isTreeRowLeafGetter(rows);
const getTreeRowLevelComputed = ({ rows }) =>
  getTreeRowLevelGetter(rows);
const collapsedTreeRowsGetterComputed = ({ rows, getCollapsedRows }) =>
  collapsedTreeRowsGetter(getCollapsedRows, rows);
const unwrappedTreeRowsComputed = ({ rows }) =>
  unwrappedCustomTreeRows(rows);

export class CustomTreeData extends React.PureComponent {
  render() {
    const {
      getChildRows,
    } = this.props;
    const treeRowsComputed = ({ rows }) =>
      customTreeRowsWithMeta(rows, getChildRows);

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

CustomTreeData.propTypes = {
  getChildRows: PropTypes.func.isRequired,
};
