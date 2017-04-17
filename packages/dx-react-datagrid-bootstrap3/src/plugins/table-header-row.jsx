import React from 'react';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-datagrid';
import { HeaderCell } from '../templates/header-cell';

export const TableHeaderRow = ({ sortingEnabled, groupingEnabled }) => (
  <TableHeaderRowBase
    headerCellTemplate={HeaderCell}
    sortingEnabled={sortingEnabled}
    groupingEnabled={groupingEnabled}
  />
);

TableHeaderRow.defaultProps = {
  sortingEnabled: true,
  groupingEnabled: true,
};

TableHeaderRow.propTypes = {
  sortingEnabled: React.PropTypes.bool,
  groupingEnabled: React.PropTypes.bool,
};
