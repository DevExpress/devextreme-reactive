import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupedRows,
  expandedGroupRows,
  getColumnExtension,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'GroupingState' },
];

const expandedGroupedRowsComputed = ({ rows, grouping, expandedGroups }) =>
  expandedGroupRows(rows, grouping, expandedGroups);

export class LocalGrouping extends React.PureComponent {
  render() {
    const { columnExtensions } = this.props;
    const getColumnCriteria = columnName =>
      getColumnExtension(columnExtensions, columnName).criteria;

    const groupedRowsComputed = ({ rows, grouping, getCellValue }) =>
      groupedRows(rows, grouping, getCellValue, getColumnCriteria);

    return (
      <PluginContainer
        pluginName="LocalGrouping"
        dependencies={pluginDependencies}
      >
        <Getter name="isGroupRow" value={groupRowChecker} />
        <Getter name="getRowLevelKey" value={groupRowLevelKeyGetter} />
        <Getter name="rows" computed={groupedRowsComputed} />
        <Getter name="rows" computed={expandedGroupedRowsComputed} />
      </PluginContainer>
    );
  }
}

LocalGrouping.propTypes = {
  columnExtensions: PropTypes.array,
};

LocalGrouping.defaultProps = {
  columnExtensions: undefined,
};
