import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { getBrightBorder } from '../utils';

const useStyles = makeStyles(theme => ({
  cell: {
    userSelect: 'none',
    padding: 0,
    textAlign: 'center',
    borderBottom: 'none',
    borderTop: getBrightBorder(theme),
    paddingTop: theme.spacing(0.5),
    boxSizing: 'border-box',
    borderRight: getBrightBorder(theme),
    'tr:first-child &': {
      borderTop: 'none',
    },
    '&:last-child': {
      borderRight: 'none',
    },
  },
  text: {
    ...theme.typography.caption,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    fontSize: '1rem',
  },
}));

export const Cell = React.memo(({
  className,
  groupingItem,
  colSpan,
  ...restProps
}) => {
  const classes = useStyles();
  return (
    <TableCell
      className={classNames(classes.cell, className)}
      colSpan={colSpan}
      {...restProps}
    >
      <div className={classes.text}>
        {groupingItem.text}
      </div>
    </TableCell>
  );
});

Cell.propTypes = {
  className: PropTypes.string,
  groupingItem: PropTypes.object.isRequired,
  colSpan: PropTypes.number.isRequired,
};

Cell.defaultProps = {
  className: undefined,
};

// export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
