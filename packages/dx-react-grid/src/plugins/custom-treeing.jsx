import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import {
  customTreeRowLevelKeyGetter,
  customTreeingRowIdGetter,
  customTreeedRowsWithMeta,
  expandedTreeRows,
  collapsedTreeRowsGetter,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'TreeingState' },
];

const expandedTreeRowsComputed = ({ rows, getRowId, expandedRowIds }) =>
  expandedTreeRows(rows, getRowId, expandedRowIds);
const getRowIdComputed = ({ getRowId, rows }) =>
  customTreeingRowIdGetter(getRowId, rows);
const getRowLevelKeyComputed = ({ getRowLevelKey, rows }) =>
  customTreeRowLevelKeyGetter(getRowLevelKey, rows);
const collapsedTreeRowsGetterComputed = ({ rows, getCollapsedRows }) =>
  collapsedTreeRowsGetter(getCollapsedRows, rows);

export class CustomTreeing extends React.PureComponent {
  render() {
    const {
      getChildRows,
    } = this.props;
    const groupedRowsComputed = ({ rows }) =>
      customTreeedRowsWithMeta(rows, getChildRows);

    return (
      <Plugin
        name="CustomTreeing"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={groupedRowsComputed} />
        <Getter name="getRowId" computed={getRowIdComputed} />
        <Getter name="getRowLevelKey" computed={getRowLevelKeyComputed} />
        <Getter name="rows" computed={expandedTreeRowsComputed} />
        <Getter name="getCollapsedRows" computed={collapsedTreeRowsGetterComputed} />
        <Getter name="rows" computed={({ rows }) => rows.rows} />
      </Plugin>
    );
  }
}

CustomTreeing.propTypes = {
  getChildRows: PropTypes.func.isRequired,
};
