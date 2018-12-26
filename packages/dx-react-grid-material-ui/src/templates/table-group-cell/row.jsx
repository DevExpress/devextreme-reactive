import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { TableRow } from '../table-row';

const styles = () => ({
  row: {
    cursor: 'pointer',
  },
});

const RowBase = ({ children, classes, className, ...restProps }) => (
  <TableRow
    {...restProps}
    className={classNames(classes.row, className)}
  >
    {children}
  </TableRow>
);

RowBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

RowBase.defaultProps = {
  className: undefined,
};

export const Row = withStyles(styles)(RowBase);
