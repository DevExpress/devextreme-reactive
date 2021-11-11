import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { getStickyCellStyle, getBorder } from '../utils';

const PREFIX = 'IndentCell';
export const classes = {
  indentCell: `${PREFIX}-indentCell`,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.indentCell}`]: {
    ...getStickyCellStyle(theme),
    borderBottom: getBorder(theme),
  },
}));

export const IndentCell = ({
  tableRow,
  tableColumn,
  row, column,
  style, className,
  position, side,
  forwardedRef,
  ...restProps
}) => (
  <StyledTableCell
    className={classNames(classes.indentCell, className)}
    ref={forwardedRef}
    style={{ ...style, [side]: position }}
    {...restProps}
  />
);

IndentCell.propTypes = {
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  row: PropTypes.any,
  column: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  side: PropTypes.string,
  position: PropTypes.number,
  forwardedRef: PropTypes.func,
};

IndentCell.defaultProps = {
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
