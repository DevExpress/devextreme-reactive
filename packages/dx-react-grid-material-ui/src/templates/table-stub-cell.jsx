import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import withStyles from '@mui/styles/withStyles';
import { getBorder } from './utils';

const styles = theme => ({
  cell: {
    padding: 0,
  },
  footer: {
    borderBottom: getBorder(theme),
  },
});

const TableStubCellBase = ({
  classes,
  className,
  tableRow,
  tableColumn,
  forwardedRef,
  ...restProps
}) => (
  <TableCell
    ref={forwardedRef}
    className={classNames(classes.cell, className)}
    classes={{ footer: classes.footer }}
    {...restProps}
  />
);

TableStubCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableStubCellBase.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  forwardedRef: undefined,
};

export const TableStubCell = withStyles(styles, { name: 'TableStubCell' })(TableStubCellBase);
