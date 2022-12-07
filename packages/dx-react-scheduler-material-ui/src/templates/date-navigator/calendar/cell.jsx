import * as React from 'react';
import { styled, TableCell } from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'Cell';

export const classes = {
  cell: `${PREFIX}-cell`,
  otherMonth: `${PREFIX}-otherMonth`,
  selected: `${PREFIX}-selected`,
  today: `${PREFIX}-today`,
};

const StyledTableCell = styled(TableCell)(({ theme: { palette, spacing } }) => ({
  [`&.${classes.cell}`]: {
    userSelect: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    height: spacing(6),
    textAlign: 'center',
    verticalAlign: 'middle',
    '&:last-child': {
      padding: 0,
    },
  },
  [`&.${classes.otherMonth}`]: {
    color: palette.text.disabled,
  },
  [`& .${classes.selected}`]: {
    background: palette.primary.main,
    color: palette.primary.contrastText,
    display: 'inline-block',
    width: '2.3em',
    lineHeight: 2.3,
    borderRadius: '50%',
    cursor: 'default',
  },
  [`& .${classes.today}`]: {
    color: palette.primary.main,
    fontWeight: 'bold',
  },
}));

export const Cell = ({
  otherMonth,
  selected,
  today,
  children,
  className,
  ...restProps
}) => (
  <StyledTableCell
    className={classNames({
      [classes.cell]: true,
      [classes.otherMonth]: otherMonth,
    }, className)}
    {...restProps}
  >
    <span
      className={classNames({
        [classes.selected]: selected,
        [classes.today]: today && !selected,
      })}
    >
      {children}
    </span>
  </StyledTableCell>
);

Cell.propTypes = {
  children: PropTypes.node,
  otherMonth: PropTypes.bool,
  selected: PropTypes.bool,
  today: PropTypes.bool,
  className: PropTypes.string,
};

Cell.defaultProps = {
  children: undefined,
  otherMonth: false,
  selected: false,
  today: false,
  className: undefined,
};
