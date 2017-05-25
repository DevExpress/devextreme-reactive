import React from 'react';
import PropTypes from 'prop-types';

import {
    Checkbox,
    TableCell,
} from 'material-ui';

export const TableSelectCell = ({ style, selected, changeSelected }) => (
  <TableCell
    checkbox
    style={{
      ...style,
    }}
    onClick={(e) => {
      e.stopPropagation();
      changeSelected();
    }}
  >
    <Checkbox checked={selected} />
  </TableCell>
);
TableSelectCell.defaultProps = {
  style: null,
  selected: false,
  changeSelected: () => {},
};
TableSelectCell.propTypes = {
  style: PropTypes.shape(),
  selected: PropTypes.bool,
  changeSelected: PropTypes.func,
};
