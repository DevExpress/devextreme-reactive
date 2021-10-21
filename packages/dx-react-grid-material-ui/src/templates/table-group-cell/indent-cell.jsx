import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import withStyles from '@mui/styles/withStyles';
import { getStickyCellStyle, getBorder } from '../utils';

const styles = theme => ({
  indentCell: {
    ...getStickyCellStyle(theme),
    borderBottom: getBorder(theme),
  },
});

const IndentCellBase = ({
  tableRow,
  tableColumn,
  row, column,
  style, className, classes,
  position, side,
  forwardedRef,
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.indentCell, className)}
    ref={forwardedRef}
    style={{ ...style, [side]: position }}
    {...restProps}
  />
);

IndentCellBase.propTypes = {
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  row: PropTypes.any,
  column: PropTypes.object,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  side: PropTypes.string,
  position: PropTypes.number,
  forwardedRef: PropTypes.object,
};

IndentCellBase.defaultProps = {
  tableRow: undefined,
  tableColumn: undefined,
  row: {},
  column: {},
  style: null,
  className: undefined,
  side: 'left',
  position: undefined,
  forwardedRef: undefined,
};

export const IndentCell = withStyles(styles)(IndentCellBase);
