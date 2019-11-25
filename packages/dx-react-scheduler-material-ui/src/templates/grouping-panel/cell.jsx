import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';

const useStyles = makeStyles(theme => ({
  cell: {
    width: ({ width }) => width,
    userSelect: 'none',
    paddingBottom: 0,
    textAlign: 'center',
    borderBottom: 'none',
    paddingRight: 0,
    paddingLeft: 0,
    '@media (max-width: 700px)': {
      padding: theme.spacing(1),
      paddingBottom: 0,
    },
    'table:last-child &': {
      borderBottom: getBorder(theme),
    },
    '&:only-child': {
      textAlign: 'left',
      paddingLeft: theme.spacing(2),
    },
    paddingTop: theme.spacing(0.5),
  },
}));

export const Cell = React.memo(({
  className,
  groupingItem,
  width,
  ...restProps
}) => {
  const classes = useStyles({ width });
  return (
    <TableCell
      className={classNames(classes.cell, className)}
      {...restProps}
      colspan={7}
    >
      {groupingItem.text}
    </TableCell>
  );
});

Cell.propTypes = {
  classes: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  today: PropTypes.bool,
  width: PropTypes.string,
};

Cell.defaultProps = {
  className: undefined,
  endDate: undefined,
  today: false,
  width: '0',
};

// export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
