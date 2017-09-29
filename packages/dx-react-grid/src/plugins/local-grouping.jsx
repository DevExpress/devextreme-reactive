import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { groupedRows, expandedGroupRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'GroupingState' },
];

const expandedGroupedRowsComputed = ({ rows, grouping, expandedGroups }) =>
  expandedGroupRows(rows, grouping, expandedGroups);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalGrouping extends React.PureComponent {
  render() {
    const { getColumnGroupIdentity } = this.props;

    const groupedRowsComputed = ({ rows, grouping, getCellValue }) =>
      groupedRows(rows, grouping, getCellValue, getColumnGroupIdentity);

    return (
      <PluginContainer
        pluginName="LocalGrouping"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={groupedRowsComputed} />
        <Getter name="rows" computed={expandedGroupedRowsComputed} />
      </PluginContainer>
    );
  }
}

LocalGrouping.propTypes = {
  getColumnGroupIdentity: PropTypes.func,
};

LocalGrouping.defaultProps = {
  getColumnGroupIdentity: undefined,
};
