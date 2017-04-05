import React from 'react';
import { TableSelection as TableSelectionBase } from '@devexpress/dx-react-datagrid';
import { SelectAllCell } from '../templates/select-all-cell';
import { SelectCell } from '../templates/select-cell';

export const TableSelection = ({ selectByRowClick, showSelectAll, showCheckboxes }) => (
  <TableSelectionBase
    selectByRowClick={selectByRowClick}
    showSelectAll={showSelectAll}
    showCheckboxes={showCheckboxes}
    selectCellTemplate={SelectCell}
    selectAllCellTemplate={SelectAllCell}
  />
);
TableSelection.defaultProps = {
  selectByRowClick: false,
  showSelectAll: true,
  showCheckboxes: true,
};
TableSelection.propTypes = {
  selectByRowClick: React.PropTypes.bool,
  showSelectAll: React.PropTypes.bool,
  showCheckboxes: React.PropTypes.bool,
};
