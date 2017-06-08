import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, Input } from 'material-ui';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('TableFilterCell', theme => ({
  cell: {
    verticalAlign: 'top',
    paddingTop: theme.spacing.unit + 4,
    paddingRight: theme.spacing.unit,
  },
  input: {
    width: '100%',
  },
}));

const TableFilterCellBase = ({ style, column, filter, setFilter, classes }) => (
  <TableCell
    className={classes.cell}
    style={style}
  >
    {!column.type && (
      <Input
        className={classes.input}
        value={filter ? filter.value : ''}
        placeholder={'Filter...'}
        onChange={e => setFilter({ value: e.target.value })}
      />
    )}
  </TableCell>
);

TableFilterCellBase.propTypes = {
  column: PropTypes.object,
  style: PropTypes.object,
  filter: PropTypes.object,
  setFilter: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

TableFilterCellBase.defaultProps = {
  column: {},
  style: null,
  filter: null,
  setFilter: () => {},
};

export const TableFilterCell = withStyles(styleSheet)(TableFilterCellBase);
