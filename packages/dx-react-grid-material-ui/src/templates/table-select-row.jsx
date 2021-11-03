import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import getSelectionColor from '../utils/get-selection-color';

const PREFIX = 'TableSelectRow';
export const classes = {
  selected: `${PREFIX}-selected`,
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${classes.selected}`]: {
    backgroundColor: getSelectionColor(theme),
  },
}));

export const TableSelectRow = ({
  children,
  className,
  onToggle,
  row,
  selectByRowClick,
  highlighted,
  tableColumn,
  tableRow,
  forwardedRef,
  ...restProps
}) => (
  <StyledTableRow
    ref={forwardedRef}
    className={classNames({ [classes.selected]: highlighted }, className)}
    onClick={(e) => {
      if (!selectByRowClick) return;
      e.stopPropagation();
      onToggle();
    }}
    {...restProps}
  >
    {children}
  </StyledTableRow>
);

TableSelectRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onToggle: PropTypes.func,
  row: PropTypes.any,
  selectByRowClick: PropTypes.bool,
  highlighted: PropTypes.bool,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableSelectRow.defaultProps = {
  children: undefined,
  className: undefined,
  onToggle: () => {},
  row: undefined,
  selectByRowClick: false,
  highlighted: false,
  tableColumn: undefined,
  tableRow: undefined,
  forwardedRef: undefined,
};
