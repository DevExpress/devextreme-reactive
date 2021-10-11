import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import withStyles from '@mui/styles/withStyles';
import { VIEW_TYPES } from '@devexpress/dx-scheduler-core';
import { getBorder, getBrightBorder } from '../../../utils';
import { SPACING_CELL_HEIGHT } from '../../../constants';

const styles = theme => ({
  cell: {
    height: theme.spacing(SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK]),
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
  allDayCell: {
    height: theme.spacing(SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL]),
  },
});

const TickCellBase = ({
  classes,
  className,
  startDate,
  endDate,
  endOfGroup,
  groupingInfo,
  isAllDay,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
      [classes.brightBottomBorder]: endOfGroup,
      [classes.allDayCell]: isAllDay,
    }, className)}
    {...restProps}
  />
);

TickCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  endOfGroup: PropTypes.bool,
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
  isAllDay: PropTypes.bool,
  className: PropTypes.string,
};

TickCellBase.defaultProps = {
  className: undefined,
  startDate: undefined,
  endDate: undefined,
  endOfGroup: false,
  groupingInfo: undefined,
  isAllDay: false,
};

export const TickCell = withStyles(styles, { name: 'TickCell' })(TickCellBase);
