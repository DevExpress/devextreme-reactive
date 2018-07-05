import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const TableBase = ({
  children, classes, dateTableRef, ...restProps
}) => (
  <RootRef rootRef={dateTableRef}>
    <TableMUI
      className={classes.table}
      {...restProps}
    >
      <TableBody>
        {children}
      </TableBody>
    </TableMUI>
  </RootRef>
);

TableBase.propTypes = {
  children: PropTypes.node.isRequired,
  dateTableRef: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
