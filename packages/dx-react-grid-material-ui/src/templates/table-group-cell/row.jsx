import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material';
import { TableRow } from '../table-row';

const PREFIX = 'Row';
export const classes = {
  row: `${PREFIX}-row`,
};
const StyledTableRow = styled(TableRow)(() => ({
  [`&.${classes.row}`]: {
    cursor: 'pointer',
  },
}));

export const Row = ({
  children, className, ...restProps
}) => (
  <StyledTableRow
    {...restProps}
    className={classNames(classes.row, className)}
  >
    {children}
  </StyledTableRow>
);

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Row.defaultProps = {
  children: null,
  className: undefined,
};
