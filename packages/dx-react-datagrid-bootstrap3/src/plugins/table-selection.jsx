import React from 'react';
import PropTypes from 'prop-types';
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
  highlightSelected: PropTypes.bool,
  selectByRowClick: PropTypes.bool,
  showSelectAll: PropTypes.bool,
  showCheckboxes: PropTypes.bool,
};
