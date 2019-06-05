import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
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
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.indentCell, className)}
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
};

export const IndentCell = withStyles(styles)(IndentCellBase);
