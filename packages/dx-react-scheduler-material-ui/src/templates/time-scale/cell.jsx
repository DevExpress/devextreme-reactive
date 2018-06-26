import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

const styles = theme => ({
  cell: {
    border: 0,
    padding: 10,
    '&:last-child': {
      padding: 10,
    },
  },
  text: {
    ...theme.typography.caption,
  },
});

const CellBase = ({
  classes,
  children,
  time,
  ...restProps
}) => {
  const currentTime = moment(time);
  return (
    <TableCell
      numeric
      className={classes.cell}
      {...restProps}
    >
      {children || (
        <span className={classes.text}>
          {currentTime.format('h')}:
          {currentTime.format('mm')}
          {currentTime.format('A')}
        </span>
      )}
    </TableCell>
  );
};

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  time: PropTypes.string,
};

CellBase.defaultProps = {
  children: null,
  time: '',
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
