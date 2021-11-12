import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const PREFIX = 'TableSelectAllCell';
export const classes = {
  cell: `${PREFIX}-cell`,
  checkbox: `${PREFIX}-checkbox`,
  alignWithRowSpan: `${PREFIX}-alignWithRowSpan`,
  pointer: `${PREFIX}-pointer`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    overflow: 'visible',
    paddingRight: 0,
    paddingLeft: theme.spacing(1),
    textAlign: 'center',
  },
  [`&.${classes.pointer}`]: {
    cursor: 'pointer',
  },
  [`&.${classes.alignWithRowSpan}`]: {
    verticalAlign: 'bottom',
    paddingBottom: theme.spacing(0.5),
  },
  [`& .${classes.checkbox}`]: {
    padding: theme.spacing(1),
  },
}));

export const TableSelectAllCell = ({
  allSelected, someSelected, disabled, onToggle,
  className, tableRow, tableColumn, rowSpan,
  forwardedRef,
  ...restProps
}) => {
  const cellClasses = classNames({
    [classes.cell]: true,
    [classes.pointer]: !disabled,
    [classes.alignWithRowSpan]: rowSpan > 1,
  }, className);

  return (
    <StyledTableCell
      padding="checkbox"
      className={cellClasses}
      rowSpan={rowSpan}
      ref={forwardedRef}
      {...restProps}
    >
      <Checkbox
        checked={allSelected}
        className={classes.checkbox}
        indeterminate={someSelected}
        disabled={disabled}
        onClick={(e) => {
          if (disabled) return;

          e.stopPropagation();
          onToggle();
        }}
      />
    </StyledTableCell>
  );
};

TableSelectAllCell.propTypes = {
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  rowSpan: PropTypes.number,
  forwardedRef: PropTypes.func,
};

TableSelectAllCell.defaultProps = {
  allSelected: false,
  someSelected: false,
  disabled: false,
  onToggle: () => {},
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  rowSpan: undefined,
  forwardedRef: undefined,
};
