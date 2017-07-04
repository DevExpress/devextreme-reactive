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

const TableCellBase = ({ style, row, column, classes }) => (
  <TableCellMUI
    style={{
      ...style,
    }}
    className={classNames({
      [classes.cell]: true,
      [classes.cellRightAlign]: column.align === 'right',
    })}
  >
    {row[column.name]}
  </TableCellMUI>
);

TableCellBase.propTypes = {
  style: PropTypes.shape(),
  row: PropTypes.shape(),
  column: PropTypes.shape(),
  classes: PropTypes.object.isRequired,
};

TableCellBase.defaultProps = {
  style: null,
  row: {},
  column: {},
};

export const TableCell = withStyles(styleSheet)(TableCellBase);
