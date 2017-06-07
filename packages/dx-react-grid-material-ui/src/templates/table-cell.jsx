import React from 'react';
import PropTypes from 'prop-types';

import {
  TableCell as TableCellMUI,
} from 'material-ui';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('TableCell', theme => ({
  cell: {
    paddingRight: theme.spacing.unit * 3,
  },
}));

const TableCellBase = ({ style, row, column, classes }) => (
  <TableCellMUI
    style={style}
    className={classes.cell}
  >
    {row[column.name]}
  </TableCellMUI>
);

TableCellBase.propTypes = {
  style: PropTypes.shape(),
  row: PropTypes.shape(),
  column: PropTypes.shape(),
  classes: PropTypes.object.isRequired,
};

TableCellBase.defaultProps = {
  style: null,
  row: {},
  column: {},
};

export const TableCell = withStyles(styleSheet)(TableCellBase);
