import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  TableCell as TableCellMUI,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing.unit,
    '& ~ $cell': {
      paddingLeft: theme.spacing.unit,
    },
  },
  cellRightAlign: {
    textAlign: 'right',
  },
});

const TableCellBase = ({ style, column, value, children, classes }) => (
  <TableCellMUI
    style={{
      ...style,
    }}
    className={classNames({
      [classes.cell]: true,
      [classes.cellRightAlign]: column.align === 'right',
    })}
  >
    {children || value}
  </TableCellMUI>
);

TableCellBase.propTypes = {
  style: PropTypes.shape(),
  value: PropTypes.any,
  column: PropTypes.shape(),
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

TableCellBase.defaultProps = {
  style: null,
  value: undefined,
  column: {},
  children: undefined,
};

export const TableCell = withStyles(styles, { name: 'TableCell' })(TableCellBase);
