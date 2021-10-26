import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
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

const HeaderCellBase = ({
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

HeaderCellBase.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

HeaderCellBase.defaultProps = {
  children: undefined,
  className: undefined,
};

export const HeaderCell = (HeaderCellBase);
