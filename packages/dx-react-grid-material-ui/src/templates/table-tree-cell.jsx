import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { TableCell as TableCellMUI, styled } from '@mui/material';

const PREFIX = 'TableTreeCell';
export const classes = {
  cell: `${PREFIX}-cell`,
  container: `${PREFIX}-container`,
  cellNoWrap: `${PREFIX}-cellNoWrap`,
  cellRightAlign: `${PREFIX}-cellRightAlign`,
  cellCenterAlign: `${PREFIX}-cellCenterAlign`,
};

const StyledTableCellMUI = styled(TableCellMUI)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    padding: theme.spacing(0.5, 1),
    '&:first-of-type': {
      paddingLeft: theme.spacing(3),
    },
  },
  [`&.${classes.cellNoWrap}`]: {
    whiteSpace: 'nowrap',
  },
  [`&.${classes.cellRightAlign}`]: {
    textAlign: 'right',
  },
  [`&.${classes.cellCenterAlign}`]: {
    textAlign: 'center',
  },
  [`& .${classes.container}`]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export const TableTreeCell = ({
  column, value, children,
  tableRow, tableColumn, row,
  className, forwardedRef,
  ...restProps
}) => (
  <StyledTableCellMUI
    className={classNames({
      [classes.cell]: true,
      [classes.cellNoWrap]: !(tableColumn && tableColumn.wordWrapEnabled),
      [classes.cellRightAlign]: tableColumn && tableColumn.align === 'right',
      [classes.cellCenterAlign]: tableColumn && tableColumn.align === 'center',
    }, className)}
    ref={forwardedRef}
    {...restProps}
  >
    <div className={classes.container}>
      {children}
    </div>
  </StyledTableCellMUI>
);

TableTreeCell.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  forwardedRef: PropTypes.func,
};

TableTreeCell.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  forwardedRef: undefined,
};
