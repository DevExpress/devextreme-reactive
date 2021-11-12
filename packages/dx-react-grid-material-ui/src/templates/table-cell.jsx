import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCellMUI from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { getBorder } from './utils';

const PREFIX = 'TableCell';
export const classes = {
  cell: `${PREFIX}-cell`,
  footer: `${PREFIX}-footer`,
  cellRightAlign: `${PREFIX}-cellRightAlign`,
  cellCenterAlign: `${PREFIX}-cellCenterAlign`,
  cellNoWrap: `${PREFIX}-cellNoWrap`,
};

const StyledTableCellMUI = styled(TableCellMUI)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    '&:first-of-type': {
      paddingLeft: theme.spacing(3),
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  [`&.${classes.footer}`]: {
    borderBottom: getBorder(theme),
  },
  [`&.${classes.cellRightAlign}`]: {
    textAlign: 'right',
  },
  [`&.${classes.cellCenterAlign}`]: {
    textAlign: 'center',
  },
  [`&.${classes.cellNoWrap}`]: {
    whiteSpace: 'nowrap',
  },
}));

export const TableCell = ({
  column, value, children,
  tableRow, tableColumn, row,
  className, forwardedRef,
  ...restProps
}) => (
  <StyledTableCellMUI
    className={classNames({
      [classes.cell]: true,
      [classes.cellRightAlign]: tableColumn && tableColumn.align === 'right',
      [classes.cellCenterAlign]: tableColumn && tableColumn.align === 'center',
      [classes.cellNoWrap]: !(tableColumn && tableColumn.wordWrapEnabled),
    }, className)}
    classes={{ footer: classes.footer }}
    ref={forwardedRef}
    {...restProps}
  >
    {children || value}
  </StyledTableCellMUI>
);

TableCell.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  forwardedRef: PropTypes.func,
};

TableCell.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  forwardedRef: undefined,
};
