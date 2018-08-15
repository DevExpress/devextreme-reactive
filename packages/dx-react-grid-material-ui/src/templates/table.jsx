import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableMUI from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from './utils';

const styles = theme => ({
  table: {
    tableLayout: 'fixed',
    overflow: 'hidden',
  },
  stickyTable: {
    position: 'sticky',
    zIndex: 1,
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
  children, classes, className, use,
  ...restProps
}) => (
  <TableMUI
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
};

TableBase.defaultProps = {
  use: undefined,
  className: undefined,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
