import React from 'react';
import PropTypes from 'prop-types';

import {
    TableCell as TableCellMUI,
} from 'material-ui';

export const TableCell = ({ style, row, column }) => {
  const value = row[column.name];
  return (
    <TableCellMUI
      style={{
        ...style,
        ...value === undefined ? { padding: 0 } : {},
      }}
    >
      {row[column.name]}
    </TableCellMUI>
  );
};

TableCell.propTypes = {
  style: PropTypes.shape(),
  row: PropTypes.shape(),
  column: PropTypes.shape(),
};

TableCell.defaultProps = {
  style: null,
  row: {},
  column: {},
};
