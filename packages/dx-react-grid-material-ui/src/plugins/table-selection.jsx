import React from 'react';
import PropTypes from 'prop-types';

import { TableSelection as TableSelectionBase } from '@devexpress/dx-react-grid';
import { TableSelectAllCell } from '../templates/table-select-all-cell';
import { TableSelectCell } from '../templates/table-select-cell';

const selectCellTemplate = props => <TableSelectCell {...props} />;
const selectAllCellTemplate = props => <TableSelectAllCell {...props} />;

export const TableSelection = props => (
  <TableSelectionBase
    selectCellTemplate={selectCellTemplate}
    selectAllCellTemplate={selectAllCellTemplate}
    {...props}
  />
);

TableSelection.defaultProps = {
  selectionColumnWidth: 50,
};

TableSelection.propTypes = {
  selectionColumnWidth: PropTypes.number,
};
