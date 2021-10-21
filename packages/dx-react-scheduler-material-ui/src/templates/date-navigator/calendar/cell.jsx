import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';

const styles = ({ palette, spacing }) => ({
  cell: {
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
  otherMonth: {
    color: palette.text.disabled,
  },
  selected: {
    background: palette.primary.main,
    color: palette.primary.contrastText,
    display: 'inline-block',
    width: '2.3em',
    lineHeight: 2.3,
    borderRadius: '50%',
    cursor: 'default',
  },
  today: {
    color: palette.primary.main,
    fontWeight: 'bold',
  },
});

const CellBase = ({
  otherMonth,
  selected,
  today,
  classes,
  children,
  className,
  ...restProps
}) => (
  <TableCell
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
  </TableCell>
);

CellBase.propTypes = {
  children: PropTypes.node,
  otherMonth: PropTypes.bool,
  selected: PropTypes.bool,
  today: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

CellBase.defaultProps = {
  children: undefined,
  otherMonth: false,
  selected: false,
  today: false,
  className: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
