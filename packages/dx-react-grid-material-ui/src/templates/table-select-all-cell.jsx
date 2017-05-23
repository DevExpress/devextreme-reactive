import React from 'react';
import PropTypes from 'prop-types';

import {
    Checkbox,
    TableCell,
} from 'material-ui';

export const TableSelectAllCell = (
  { style, allSelected, /* someSelected,*/ selectionAvailable, toggleAll },
) => (
  <TableCell
    checkbox
    style={{
      cursor: selectionAvailable && 'pointer',
      width: '30px',
      ...style,
    }}
    onClick={(e) => {
      if (!selectionAvailable) return;

      e.stopPropagation();
      toggleAll();
    }}
  >
    <Checkbox
      checked={allSelected}
      disabled={!selectionAvailable}
    />
  </TableCell>
);
TableSelectAllCell.defaultProps = {
  style: null,
  allSelected: false,
  someSelected: false,
  selectionAvailable: false,
  toggleAll: () => {},
};
TableSelectAllCell.propTypes = {
  style: PropTypes.shape(),
  allSelected: PropTypes.bool,
//  someSelected: PropTypes.bool,
  selectionAvailable: PropTypes.bool,
  toggleAll: PropTypes.func,
};
