import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('TableEmptyCell', () => ({
  cell: {
    padding: 0,
  },
}));

const TableEmptyCellBase = ({ style, classes }) => (
  <TableCell
    style={style}
    className={classes.cell}
  />
);

TableEmptyCellBase.propTypes = {
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

TableEmptyCellBase.defaultProps = {
  style: {},
};

export const TableEmptyCell = withStyles(styleSheet)(TableEmptyCellBase);
