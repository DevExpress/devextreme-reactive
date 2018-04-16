import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { TableRow } from 'material-ui/Table';

const styles = {
  row: {
    height: 'auto',
  },
};

export const RowBase = ({
  children, classes, className, row, tableRow, tableColumn, ...restProps
}) => (
  <TableRow
    className={classNames(classes.row, className)}
    {...restProps}
  >
    {children}
  </TableRow>
);

RowBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  row: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
};

RowBase.defaultProps = {
  children: undefined,
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};

export const Row = withStyles(styles, { name: 'Row' })(RowBase);
