import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { getBorder } from '../utils';
import { BaseCell } from './base-cell';

const useStyles = makeStyles(theme => ({
  cell: ({ rowSpan }) => ({
    borderRight: getBorder(theme),
    '&:last-child': {
      borderRight: 'none',
      width: '100%',
    },
    borderBottom: getBorder(theme),
    [`tr:nth-last-child(${rowSpan}) &`]: {
      borderBottom: 'none',
    },
  }),
}));

export const AllDayCell = React.memo(({
  className,
  group,
  rowSpan,
  hasBrightBorder,
  height,
  timeTableCellHeight,
  ...restProps
}) => {
  const classes = useStyles({ rowSpan });

  return (
    <BaseCell
      className={classNames(classes.cell, className)}
      group={group}
      colSpan={1}
      rowSpan={rowSpan}
      left={0}
      height={height}
      timeTableCellHeight={timeTableCellHeight}
      groupOrientation={VERTICAL_GROUP_ORIENTATION}
      textStyle={{
        fontWeight: 'normal',
        fontSize: '0.8rem',
      }}
      {...restProps}
    />
  );
});

AllDayCell.propTypes = {
  className: PropTypes.string,
  group: PropTypes.object.isRequired,
  rowSpan: PropTypes.number,
  height: PropTypes.number,
  timeTableCellHeight: PropTypes.number,
  hasBrightBorder: PropTypes.bool,
};

AllDayCell.defaultProps = {
  className: undefined,
  hasBrightBorder: true,
  rowSpan: 1,
  height: undefined,
  timeTableCellHeight: 48,
};
