import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import classNames from 'clsx';

const PREFIX = 'HeaderCell';

export const classes = {
  cell: `${PREFIX}-cell`,
};

const StyledTableCell = styled(TableCell)({
  [`&.${classes.cell}`]: {
    userSelect: 'none',
    border: 'none',
    padding: 0,
    textAlign: 'center',
    verticalAlign: 'middle',
    '&:last-child': {
      padding: 0,
    },
  },
});

export const HeaderCell = ({
  children,
  className,
  ...restProps
}) => (
  <StyledTableCell
    className={classNames({
      [classes.cell]: true,
    }, className)}
    {...restProps}
  >
    {children}
  </StyledTableCell>
);

HeaderCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

HeaderCell.defaultProps = {
  children: undefined,
  className: undefined,
};
