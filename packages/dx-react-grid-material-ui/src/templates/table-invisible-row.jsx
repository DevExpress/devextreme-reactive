import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';
import { TableRow } from './table-row';

const PREFIX = 'TableInvisibleRow';
export const classes = {
  row: `${PREFIX}-row`,
};

const StyledTableRow = styled(TableRow)(() => ({
  [`&.${classes.row}`]: {
    visibility: 'hidden',
  },
}));

export const TableInvisibleRow = ({ className, ...restParams }) => (
  <StyledTableRow
    className={classNames(classes.row, className)}
    {...restParams}
  />
);

TableInvisibleRow.propTypes = {
  className: PropTypes.string,
};

TableInvisibleRow.defaultProps = {
  className: undefined,
};
