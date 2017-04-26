import React from 'react';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-datagrid';
import { TableHeaderCell } from '../templates/table-header-cell';

export const TableHeaderRow = ({ sortingEnabled, groupingEnabled }) => (
  <TableHeaderRowBase
    headerCellTemplate={TableHeaderCell}
    sortingEnabled={sortingEnabled}
    groupingEnabled={groupingEnabled}
  />
);

TableHeaderRow.defaultProps = {
  sortingEnabled: false,
  groupingEnabled: false,
};

TableHeaderRow.propTypes = {
  sortingEnabled: React.PropTypes.bool,
  groupingEnabled: React.PropTypes.bool,
};
