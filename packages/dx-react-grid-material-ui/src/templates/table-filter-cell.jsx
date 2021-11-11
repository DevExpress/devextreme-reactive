import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const PREFIX = 'TableFilterCell';
export const classes = {
  cell: `${PREFIX}-cell`,
  flexContainer: `${PREFIX}-flexContainer`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    padding: 0,
    '&:first-of-type': {
      paddingLeft: theme.spacing(3),
    },
  },
  [`& .${classes.flexContainer}`]: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));

export const TableFilterCell = ({
  filter, getMessage, onFilter,
  children, className,
  tableRow, tableColumn, column, filteringEnabled, forwardedRef,
  ...restProps
}) => (
  <StyledTableCell
    className={classNames(classes.cell, className)}
    ref={forwardedRef}
    {...restProps}
  >
    <div className={classes.flexContainer}>
      {children}
    </div>
  </StyledTableCell>
);

TableFilterCell.propTypes = {
  filter: PropTypes.object,
  onFilter: PropTypes.func,
  children: PropTypes.node,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  column: PropTypes.object,
  filteringEnabled: PropTypes.bool,
  forwardedRef: PropTypes.func,
};

TableFilterCell.defaultProps = {
  filter: null,
  onFilter: () => {},
  children: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  column: undefined,
  filteringEnabled: true,
  forwardedRef: undefined,
};
