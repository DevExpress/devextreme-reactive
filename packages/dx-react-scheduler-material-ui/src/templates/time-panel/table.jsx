import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
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
  className,
  ...restProps
}) => (
  <TableMUI {...restProps} className={classNames(classes.table, className)} >
    <TableBody>
      {children}
    </TableBody>
  </TableMUI>
);

TableBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TableBase.defaultProps = {
  className: undefined,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
