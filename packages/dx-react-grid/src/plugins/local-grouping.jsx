import React from 'react';
import { Property, PluginContainer } from '@devexpress/dx-react-core';
import { groupedRows, expandedGroupRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'GroupingState' },
];

const groupedRowsComputed = ({ rows, grouping, getCellData }) =>
  groupedRows(rows, grouping, getCellData);
const expandedGroupedRowsComputed = ({ rows, grouping, expandedGroups }) =>
  expandedGroupRows(rows, grouping, expandedGroups);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalGrouping extends React.PureComponent {
  render() {
    return (
      <PluginContainer
        pluginName="LocalGrouping"
        dependencies={pluginDependencies}
      >
        <Property name="rows" computed={groupedRowsComputed} />
        <Property name="rows" computed={expandedGroupedRowsComputed} />
      </PluginContainer>
    );
  }
}
