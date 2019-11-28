import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { getBorder, getBrightBorder } from '../utils';

const useStyles = makeStyles(theme => ({
  cell: {
    width: ({ width }) => width,
    userSelect: 'none',
    paddingBottom: 0,
    textAlign: 'center',
    borderBottom: 'none',
    paddingRight: 0,
    paddingLeft: 0,
    borderRight: getBrightBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
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
    >
      {groupingItem.text}
    </TableCell>
  );
});

Cell.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
};

Cell.defaultProps = {
  className: undefined,
  width: '0',
};

// export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
