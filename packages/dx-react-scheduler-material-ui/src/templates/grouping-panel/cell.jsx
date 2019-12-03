import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBrightBorder } from '../utils';

const styles = theme => ({
  cell: {
    userSelect: 'none',
    paddingBottom: 0,
    textAlign: 'center',
    borderBottom: 'none',
    paddingRight: 0,
    paddingLeft: 0,
    borderTop: getBrightBorder(theme),
    'tr:first-child &': {
      borderTop: 'none',
    },
    paddingTop: theme.spacing(0.5),
    boxSizing: 'border-box',
    borderRight: getBrightBorder(theme),
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
});

const CellBase = React.memo(({
  className,
  groupingItem,
  classes,
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.cell, className)}
    {...restProps}
  >
    <div className={classes.text}>
      {groupingItem.text}
    </div>
  </TableCell>
));

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  groupingItem: PropTypes.object.isRequired,
};

CellBase.defaultProps = {
  className: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
