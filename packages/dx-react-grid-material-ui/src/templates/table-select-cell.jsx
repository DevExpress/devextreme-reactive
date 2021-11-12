import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const PREFIX = 'TableSelectCell';
export const classes = {
  cell: `${PREFIX}-cell`,
  checkbox: `${PREFIX}-checkbox`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    overflow: 'visible',
    paddingRight: 0,
    paddingLeft: theme.spacing(1),
    textAlign: 'center',
  },
  [`& .${classes.checkbox}`]: {
    marginTop: '-1px',
    marginBottom: '-1px',
    padding: theme.spacing(1),
  },
}));

export const TableSelectCell = ({
  style, selected, onToggle,
  className, row, tableRow, tableColumn,
  forwardedRef,
  ...restProps
}) => (
  <StyledTableCell
    padding="checkbox"
    style={style}
    ref={forwardedRef}
    className={classNames(classes.cell, className)}
    {...restProps}
  >
    <Checkbox
      className={classes.checkbox}
      checked={selected}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    />
  </StyledTableCell>
);

TableSelectCell.propTypes = {
  style: PropTypes.object,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
  row: PropTypes.any,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  forwardedRef: PropTypes.func,
};

TableSelectCell.defaultProps = {
  style: null,
  selected: false,
  onToggle: () => {},
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  forwardedRef: undefined,
};
