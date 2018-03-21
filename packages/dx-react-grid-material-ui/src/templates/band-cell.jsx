import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell as TableCellMUI } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import { getBorderColor } from './utils';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    '&:first-child': {
      paddingLeft: '24px',
      borderLeft: 0,
    },
    height: theme.spacing.unit * 6,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    borderBottom: getBorderColor(theme),
    borderLeft: getBorderColor(theme),
  },
});

const BandCellBase = ({
  column, value, children, classes, tableRow, tableColumn, row, className, ...restProps
}) => (
  <TableCellMUI
    className={classNames(classes.cell, className)}
    {...restProps}
  >
    {children || value}
  </TableCellMUI>
);

BandCellBase.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.object,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
};

BandCellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};

export const BandCell = withStyles(styles, { name: 'BandCell' })(BandCellBase);
