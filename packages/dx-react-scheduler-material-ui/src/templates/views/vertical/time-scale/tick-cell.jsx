import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../../../utils';

const styles = theme => ({
  cell: {
    height: theme.spacing(6),
    padding: 0,
    borderBottom: getBorder(theme),
    'tr:last-child &': {
      borderBottom: 'none',
    },
  },
});

const TickCellBase = ({
  classes,
  className,
  startDate,
  endDate,
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.cell, className)}
    {...restProps}
  />
);

TickCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
};

TickCellBase.defaultProps = {
  className: undefined,
  startDate: undefined,
  endDate: undefined,
};

export const TickCell = withStyles(styles, { name: 'TickCell' })(TickCellBase);
