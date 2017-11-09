import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Table as TableMUI } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
  headTable: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    background: 'white',
    overflow: 'visible',
    fallbacks: {
      position: '-webkit-sticky',
    },
  },
};

const TableBase = ({
  children, classes, use, ...restProps
}) => (
  <TableMUI
    className={classNames({
      [classes.table]: true,
      [classes.headTable]: use === 'head',
    })}
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
};

TableBase.defaultProps = {
  use: undefined,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
