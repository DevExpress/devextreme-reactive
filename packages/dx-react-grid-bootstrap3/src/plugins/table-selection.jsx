import React from 'react';
import PropTypes from 'prop-types';

import { TableSelection as TableSelectionBase } from '@devexpress/dx-react-grid';
import { TableSelectAllCell } from '../templates/table-select-all-cell';
import { TableSelectCell } from '../templates/table-select-cell';

export const TableSelection = props => (
  <TableSelectionBase
    selectCellTemplate={TableSelectCell}
    selectAllCellTemplate={TableSelectAllCell}
    {...props}
  />
);

TableSelection.defaultProps = {
  selectionColumnWidth: 30,
};

TableSelection.propTypes = {
  selectionColumnWidth: PropTypes.number,
};
