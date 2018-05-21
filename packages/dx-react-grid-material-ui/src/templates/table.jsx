import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableMUI from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  table: {
    tableLayout: 'fixed',
    overflow: 'hidden',
  },
  headTable: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    overflow: 'visible',
    background: theme.palette.background.paper,
    fallbacks: {
      position: '-webkit-sticky',
    },
  },
});

const TableBase = ({
  children, classes, className, use,
  ...restProps
}) => (
  <TableMUI
    className={classNames({
      [classes.table]: true,
      [classes.headTable]: use === 'head',
    }, className)}
    {...restProps}
  >
    {children}
  </TableMUI>
);

TableBase.propTypes = {
  use: PropTypes.oneOf(['head']),
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TableBase.defaultProps = {
  use: undefined,
  className: undefined,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
