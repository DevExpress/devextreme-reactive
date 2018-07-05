import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const TableBase = ({
  children,
  classes,
  ...restProps
}) => (
  <TableMUI
    className={classes.table}
    {...restProps}
  >
    <TableBody>
      {children}
    </TableBody>
  </TableMUI>
);

TableBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
