import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('TableDetailCell', theme => ({
  active: {
    backgroundColor: theme.palette.background.contentFrame,
  },
}));

const TableDetailCellBase = ({ colSpan, style, template, classes }) => (
  <TableCell
    style={style}
    colSpan={colSpan}
    className={classes.active}
  >
    {template()}
  </TableCell>
);

TableDetailCellBase.propTypes = {
  style: PropTypes.shape(),
  colSpan: PropTypes.number,
  template: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

TableDetailCellBase.defaultProps = {
  style: null,
  colSpan: 1,
};

export const TableDetailCell = withStyles(styleSheet)(TableDetailCellBase);
