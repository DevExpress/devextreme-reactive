import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupCollapsedRowsGetter,
  groupedRows,
  expandedGroupRows,
  getColumnExtension,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'GroupingState' },
];

const getCollapsedRowsComputed = ({ getCollapsedRows }) =>
  groupCollapsedRowsGetter(getCollapsedRows);
const expandedGroupedRowsComputed = ({ rows, grouping, expandedGroups }) =>
  expandedGroupRows(rows, grouping, expandedGroups);

export class IntegratedGrouping extends React.PureComponent {
  render() {
    const { columnExtensions } = this.props;
    const getColumnCriteria = columnName =>
      getColumnExtension(columnExtensions, columnName).criteria;

    const groupedRowsComputed = ({ rows, grouping, getCellValue }) =>
      groupedRows(rows, grouping, getCellValue, getColumnCriteria);

    return (
      <Plugin
        name="IntegratedGrouping"
        dependencies={pluginDependencies}
      >
        <Getter name="isGroupRow" value={groupRowChecker} />
        <Getter name="getRowLevelKey" value={groupRowLevelKeyGetter} />
        <Getter name="getCollapsedRows" computed={getCollapsedRowsComputed} />
        <Getter name="rows" computed={groupedRowsComputed} />
        <Getter name="rows" computed={expandedGroupedRowsComputed} />
      </Plugin>
    );
  }
}

IntegratedGrouping.propTypes = {
  columnExtensions: PropTypes.array,
};

IntegratedGrouping.defaultProps = {
  columnExtensions: undefined,
};
