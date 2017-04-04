import React from 'react';
import { TableColumnSelection as TableColumnSelectionBase } from '@devexpress/dx-react-datagrid';
import { SelectAllCell } from '../templates/select-all-cell';
import { SelectCell } from '../templates/select-cell';

export const TableColumnSelection = ({ showSelectAll }) => (
  <TableColumnSelectionBase
    showSelectAll={showSelectAll}
    selectCellTemplate={SelectCell}
    selectAllCellTemplate={SelectAllCell}
  />
);
TableColumnSelection.defaultProps = {
  showSelectAll: true,
};
TableColumnSelection.propTypes = {
  showSelectAll: React.PropTypes.bool,
};
