import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const PREFIX = 'TableDetailCell';
export const classes = {
  active: `${PREFIX}-active`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.active}`]: {
    backgroundColor: theme.palette.background.default,
  },
}));

export const TableDetailCell = ({
  colSpan, style, children,
  className, forwardedRef,
  tableColumn, tableRow, row,
  ...restProps
}) => (
  <StyledTableCell
    style={style}
    colSpan={colSpan}
    ref={forwardedRef}
    className={classNames(classes.active, className)}
    {...restProps}
  >
    {children}
  </StyledTableCell>
);

TableDetailCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  forwardedRef: PropTypes.object,
};

TableDetailCell.defaultProps = {
  style: null,
  colSpan: 1,
  className: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  children: undefined,
  forwardedRef: undefined,
};
