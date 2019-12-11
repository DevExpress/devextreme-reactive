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
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    fontSize: '1rem',
    position: 'sticky',
    display: 'inline-block',
    left: ({ left }) => theme.spacing(left / 8),
  },
}));

export const Cell = React.memo(({
  className,
  groupingItem,
  colSpan,
  left,
  children,
  ...restProps
}) => {
  const classes = useStyles({ left });
  return (
    <TableCell
      className={classNames(classes.cell, className)}
      colSpan={colSpan}
      {...restProps}
    >
      <div className={classes.text}>
        {groupingItem.text}
        {children}
      </div>
    </TableCell>
  );
});

Cell.propTypes = {
  className: PropTypes.string,
  groupingItem: PropTypes.object.isRequired,
  colSpan: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  children: PropTypes.node,
};

Cell.defaultProps = {
  className: undefined,
  children: null,
};
