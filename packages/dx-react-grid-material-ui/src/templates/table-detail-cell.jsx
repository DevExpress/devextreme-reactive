import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  active: {
    backgroundColor: theme.palette.background.contentFrame,
  },
});

const TableDetailCellBase = ({
  colSpan, style, template, classes,
  className,
  tableColumn, tableRow, row,
  ...restProps
}) => (
  <TableCell
    style={style}
    colSpan={colSpan}
    className={classNames(classes.active, className)}
    {...restProps}
  >
    {template()}
  </TableCell>
);

TableDetailCellBase.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  template: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.object,
};

TableDetailCellBase.defaultProps = {
  style: null,
  colSpan: 1,
  className: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
};

export const TableDetailCell = withStyles(styles, { name: 'TableDetailCell' })(TableDetailCellBase);
