import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('TableDetailCell', theme => ({
  active: {
    backgroundColor: theme.palette.background.contentFrame,
  },
}));

const TableDetailCellBase = ({ colspan, style, template, classes }) =>
  <TableCell
    style={style}
    colSpan={colspan}
    className={classes.active}
  >
    {template()}
  </TableCell>;

TableDetailCellBase.propTypes = {
  style: PropTypes.shape(),
  colspan: PropTypes.number,
  template: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

TableDetailCellBase.defaultProps = {
  style: null,
  colspan: 1,
};

export const TableDetailCell = withStyles(styleSheet)(TableDetailCellBase);
