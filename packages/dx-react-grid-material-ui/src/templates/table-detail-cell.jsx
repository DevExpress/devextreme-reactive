import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  active: {
    backgroundColor: theme.palette.background.contentFrame,
  },
});

const TableDetailCellBase = ({
  colSpan, style, children, classes,
}) => (
  <TableCell
    style={style}
    colSpan={colSpan}
    className={classes.active}
  >
    {children}
  </TableCell>
);

TableDetailCellBase.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classes: PropTypes.object.isRequired,
};

TableDetailCellBase.defaultProps = {
  style: null,
  colSpan: 1,
  children: undefined,
};

export const TableDetailCell = withStyles(styles, { name: 'TableDetailCell' })(TableDetailCellBase);
