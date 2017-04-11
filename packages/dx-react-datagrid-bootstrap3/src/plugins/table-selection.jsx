import React from 'react';
import { TableSelection as TableSelectionBase } from '@devexpress/dx-react-datagrid';
import { SelectAllCell } from '../templates/select-all-cell';
import { SelectCell } from '../templates/select-cell';

export const TableSelection = ({
  highlightSelected, selectByRowClick, showSelectAll, showCheckboxes,
}) => (
  <TableSelectionBase
    selectByRowClick={selectByRowClick}
    showSelectAll={showSelectAll}
    highlightSelected={highlightSelected}
    showCheckboxes={showCheckboxes}
    selectCellTemplate={SelectCell}
    selectAllCellTemplate={SelectAllCell}
  />
);
TableSelection.defaultProps = {
  highlightSelected: false,
  selectByRowClick: false,
  showSelectAll: true,
  showCheckboxes: true,
};
TableSelection.propTypes = {
  highlightSelected: React.PropTypes.bool,
  selectByRowClick: React.PropTypes.bool,
  showSelectAll: React.PropTypes.bool,
  showCheckboxes: React.PropTypes.bool,
};
