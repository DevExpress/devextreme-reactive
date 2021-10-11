import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';
import { TableRow } from './table-row';

const styles = () => ({
  row: {
    visibility: 'hidden',
  },
});

const TableInvisibleRowBase = ({ className, classes, ...restParams }) => (
  <TableRow
    className={classNames(classes.row, className)}
    {...restParams}
  />
);

TableInvisibleRowBase.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

TableInvisibleRowBase.defaultProps = {
  className: undefined,
};

export const TableInvisibleRow = withStyles(styles, { name: 'TableInvisibleRow' })(TableInvisibleRowBase);
