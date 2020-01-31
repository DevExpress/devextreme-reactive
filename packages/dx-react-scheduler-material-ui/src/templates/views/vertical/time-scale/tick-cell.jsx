import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder, getBrightBorder } from '../../../utils';

const styles = theme => ({
  cell: {
    height: theme.spacing(6),
    padding: 0,
    boxSizing: 'border-box',
    borderBottom: getBorder(theme),
    'tr:last-child &': {
      borderBottom: 'none',
    },
  },
  brightBottomBorder: {
    borderBottom: getBrightBorder(theme),
  },
});

const TickCellBase = React.memo(({
  classes,
  className,
  startDate,
  endDate,
  endOfGroup,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
      [classes.brightBottomBorder]: endOfGroup,
    }, className)}
    {...restProps}
  />
));

TickCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  endOfGroup: PropTypes.bool,
  className: PropTypes.string,
};

TickCellBase.defaultProps = {
  className: undefined,
  startDate: undefined,
  endDate: undefined,
  endOfGroup: false,
};

export const TickCell = withStyles(styles, { name: 'TickCell' })(TickCellBase);
