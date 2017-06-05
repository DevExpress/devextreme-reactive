import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TextField } from 'material-ui';

export const TableFilterCell = ({ style, column, filter, setFilter }) => (
  <TableCell
    style={style}
  >
    {!column.type && (
      <TextField
        value={filter ? filter.value : ''}
        label={column.title || column.name}
        onChange={e => setFilter({ value: e.target.value })}
      />
    )}
  </TableCell>
);

TableFilterCell.propTypes = {
  column: PropTypes.object,
  style: PropTypes.object,
  filter: PropTypes.object,
  setFilter: PropTypes.func,
};

TableFilterCell.defaultProps = {
  column: {},
  style: null,
  filter: null,
  setFilter: () => {},
};
