import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableMUI from '@mui/material/Table';
import withStyles from '@mui/styles/withStyles';
import { getBorder } from './utils';

const styles = theme => ({
  table: {
    tableLayout: 'fixed',
    borderCollapse: 'separate',
  },
  stickyTable: {
    position: 'sticky',
    zIndex: 500,
    overflow: 'visible',
    background: theme.palette.background.paper,
    fallbacks: {
      position: '-webkit-sticky',
    },
  },
  headTable: {
    top: 0,
  },
  footTable: {
    borderTop: getBorder(theme),
    bottom: 0,
  },
});

const TableBase = ({
  children, classes, className, use, forwardedRef,
  ...restProps
}) => (
  <TableMUI
    ref={forwardedRef}
    className={classNames({
      [classes.table]: true,
      [classes.stickyTable]: !!use,
      [classes.headTable]: use === 'head',
      [classes.footTable]: use === 'foot',
    }, className)}
    {...restProps}
  >
    {children}
  </TableMUI>
);

TableBase.propTypes = {
  use: PropTypes.oneOf(['head', 'foot']),
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableBase.defaultProps = {
  use: undefined,
  className: undefined,
  forwardedRef: undefined,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
