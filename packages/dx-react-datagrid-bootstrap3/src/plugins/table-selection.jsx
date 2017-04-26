import React from 'react';
import { TableSelection as TableSelectionBase } from '@devexpress/dx-react-datagrid';
import { TableSelectAllCell } from '../templates/table-select-all-cell';
import { TableSelectCell } from '../templates/table-select-cell';

export const TableSelection = ({
  highlightSelected, selectByRowClick, showSelectAll, showCheckboxes,
}) => (
  <TableSelectionBase
    selectByRowClick={selectByRowClick}
    showSelectAll={showSelectAll}
    highlightSelected={highlightSelected}
    showCheckboxes={showCheckboxes}
    selectCellTemplate={TableSelectCell}
    selectAllCellTemplate={TableSelectAllCell}
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
