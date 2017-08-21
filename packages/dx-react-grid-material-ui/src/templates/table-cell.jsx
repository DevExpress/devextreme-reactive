import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  TableCell as TableCellMUI,
} from 'material-ui';

import { withStyles, createStyleSheet } from 'material-ui/styles';

export const styleSheet = createStyleSheet('TableCell', theme => ({
  cell: {
    paddingRight: theme.spacing.unit,
    '& ~ $cell': {
      paddingLeft: theme.spacing.unit,
    },
  },
  cellRightAlign: {
    textAlign: 'right',
  },
}));

const TableCellBase = ({ style, column, value, classes }) => (
  <TableCellMUI
    style={{
      ...style,
    }}
    className={classNames({
      [classes.cell]: true,
      [classes.cellRightAlign]: column.align === 'right',
    })}
  >
    {value}
  </TableCellMUI>
);

TableCellBase.propTypes = {
  style: PropTypes.shape(),
  value: PropTypes.any,
  column: PropTypes.shape(),
  classes: PropTypes.object.isRequired,
};

TableCellBase.defaultProps = {
  style: null,
  value: undefined,
  column: {},
};

export const TableCell = withStyles(styleSheet)(TableCellBase);
