import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
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
  children, classes, dateTableRef, className, ...restProps
}) => (
  <RootRef rootRef={dateTableRef}>
    <TableMUI
      className={classNames(classes.table, className)}
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
  className: PropTypes.string,
};

TableBase.defaultProps = {
  className: undefined,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
