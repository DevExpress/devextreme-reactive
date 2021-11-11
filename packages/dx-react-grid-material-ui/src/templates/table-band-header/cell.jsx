import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { getBorder } from '../utils';

const PREFIX = 'Cell';
export const classes = {
  cell: `${PREFIX}-cell`,
  beforeBorder: `${PREFIX}-beforeBorder`,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    '&:first-of-type': {
      paddingLeft: theme.spacing(3),
    },
    '&:last-child': {
      paddingRight: theme.spacing(3),
      borderRight: 0,
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    borderBottom: getBorder(theme),
    borderRight: getBorder(theme),
  },
  [`&.${classes.beforeBorder}`]: {
    borderLeft: getBorder(theme),
  },
}));

export const Cell = ({
  column, value, children, tableRow, tableColumn, row, className, beforeBorder,
  forwardedRef, ...restProps
}) => (
  <StyledTableCell
    className={classNames({
      [classes.cell]: true,
      [classes.beforeBorder]: beforeBorder,
    }, className)}
    {...restProps}
    ref={forwardedRef}
  >
    {children}
  </StyledTableCell>
);

Cell.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  beforeBorder: PropTypes.bool,
  forwardedRef: PropTypes.func,
};

Cell.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  beforeBorder: false,
  forwardedRef: undefined,
};
