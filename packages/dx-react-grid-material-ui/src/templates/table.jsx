import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableMUI from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  table: {
    tableLayout: 'fixed',
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TableBase.defaultProps = {
  use: undefined,
  className: undefined,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
