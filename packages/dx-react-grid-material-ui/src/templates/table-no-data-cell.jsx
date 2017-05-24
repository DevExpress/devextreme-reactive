import React from 'react';
import PropTypes from 'prop-types';

import {
    TableCell,
} from 'material-ui';

export const TableNoDataCell = ({ style, colspan }) => (
  <TableCell
    style={{
      textAlign: 'center',
      padding: '40px 0',
      ...style,
    }}
    colSpan={colspan}
  >
    <big className="text-muted">No data</big>
  </TableCell>
);

TableNoDataCell.propTypes = {
  style: PropTypes.shape(),
  colspan: PropTypes.number,
};

TableNoDataCell.defaultProps = {
  style: null,
  colspan: 1,
};
