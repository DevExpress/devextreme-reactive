import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { groupedRows, expandedGroupRows } from '@devexpress/dx-grid-core';

const groupedRowsComputed = ({ rows, groupedColumns }) =>
  groupedRows(rows, groupedColumns);
const expandedGroupedRowsComputed = ({ rows, expandedGroups }) =>
  expandedGroupRows(rows, expandedGroups);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalGrouping extends React.PureComponent {
  render() {
    return (
      <PluginContainer>
        <Getter name="rows" computed={groupedRowsComputed} />
        <Getter name="rows" computed={expandedGroupedRowsComputed} />
      </PluginContainer>
    );
  }
}
