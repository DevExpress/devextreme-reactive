import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';
import { TableRow } from '../table-row';

const styles = () => ({
  row: {
    cursor: 'pointer',
  },
});

const RowBase = ({
  children, classes, className, ...restProps
}) => (
  <TableRow
    {...restProps}
    className={classNames(classes.row, className)}
  >
    {children}
  </TableRow>
);

RowBase.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

RowBase.defaultProps = {
  children: null,
  className: undefined,
};

export const Row = withStyles(styles)(RowBase);
