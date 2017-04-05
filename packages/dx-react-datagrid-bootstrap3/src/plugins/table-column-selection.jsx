import React from 'react';
import { TableColumnSelection as TableColumnSelectionBase } from '@devexpress/dx-react-datagrid';
import { SelectAllCell } from '../templates/select-all-cell';
import { SelectCell } from '../templates/select-cell';

export const TableColumnSelection = ({ selectByRowClick, showSelectAll, showCheckboxes }) => (
  <TableColumnSelectionBase
    selectByRowClick={selectByRowClick}
    showSelectAll={showSelectAll}
    showCheckboxes={showCheckboxes}
    selectCellTemplate={SelectCell}
    selectAllCellTemplate={SelectAllCell}
  />
);
TableColumnSelection.defaultProps = {
  selectByRowClick: false,
  showSelectAll: true,
  showCheckboxes: true,
};
TableColumnSelection.propTypes = {
  selectByRowClick: React.PropTypes.bool,
  showSelectAll: React.PropTypes.bool,
  showCheckboxes: React.PropTypes.bool,
};
